import {
  loginSchema,
  createUserSchema,
} from "../validation/schemas";

describe("validation schemas", () => {
  it("rejects invalid login payload", () => {
    const result = loginSchema.safeParse({ mail: "", password: "123" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.mail).toBeDefined();
      expect(result.error.flatten().fieldErrors.password).toBeDefined();
    }
  });

  it("accepts valid login payload", () => {
    const result = loginSchema.safeParse({
      mail: "user@example.com",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("rejects user creation without required fields", () => {
    const result = createUserSchema.safeParse({});

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      expect(fields.name).toBeDefined();
      expect(fields.email).toBeDefined();
      expect(fields.password).toBeDefined();
      expect(fields.dateOfBirth).toBeDefined();
      expect(fields.role).toBeDefined();
    }
  });

  it("accepts valid user creation payload", () => {
    const result = createUserSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      dateOfBirth: "1990-01-01",
      role: "doctor",
    });

    expect(result.success).toBe(true);
  });
});
