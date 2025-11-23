import { ZodError, z } from "zod";
import { AppError } from "../errors/AppError";
import errorHandler from "../middleware/errorHandler";
import type { Request, Response, NextFunction } from "express";

const createMockRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const createMockNext = () => jest.fn() as NextFunction;

describe("errorHandler middleware", () => {
  it("handles ZodError with detailed field errors", () => {
    const schema = z.object({
      email: z.string().email("Email must be valid"),
    });

    let parsedError: ZodError | null = null;
    try {
      schema.parse({ email: "not-an-email" });
    } catch (err) {
      parsedError = err as ZodError;
    }

    const req = {} as Request;
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(parsedError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation error",
        statusCode: 400,
        errors: expect.objectContaining({
          email: expect.any(Array),
        }),
      })
    );
  });

  it("handles AppError with provided status and message", () => {
    const err = new AppError("Not found", 404, { resource: "User" });

    const req = {} as Request;
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Not found",
      statusCode: 404,
      errors: { resource: "User" },
    });
  });

  it("handles unknown errors as 500", () => {
    const err = new Error("Boom");

    const req = {} as Request;
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
      statusCode: 500,
    });
  });
});

