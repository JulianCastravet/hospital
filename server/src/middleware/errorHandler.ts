import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    const flattened = err.flatten();
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: flattened.fieldErrors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      errors: err.details,
    });
  }

  console.error("Unhandled error:", err);

  return res.status(500).json({
    message: "Internal server error",
    statusCode: 500,
  });
};

export default errorHandler;

