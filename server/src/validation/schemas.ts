import { z } from "zod";

export const loginSchema = z.object({
  mail: z
    .string({
      required_error: "Email is required",
    })
    .email("Email must be a valid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email must be a valid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  dateOfBirth: z
    .string({
      required_error: "Date of birth is required",
    })
    .min(1, "Date of birth is required"),
  role: z
    .string({
      required_error: "User role is required",
    })
    .min(1, "User role is required"),
  specialization: z.string().optional(),
  formattedAddress: z.string().optional(),
  gender: z.string().optional(),
});

// For updates we also allow userSettings to be sent from the frontend.
export const updateUserSchema = createUserSchema
  .partial()
  .extend({
    userSettings: z.array(z.string()).optional(),
  });

export const appointmentSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  phone: z.string().optional(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email must be a valid email"),
  diagnosis: z.array(z.string()).optional(),
});

export const userAppointmentSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email must be a valid email"),
  phone: z.string().optional(),
  diagnosis: z.array(z.string()),
  doctor: z
    .string({
      required_error: "Doctor is required",
    })
    .min(1, "Doctor is required"),
  time: z
    .string({
      required_error: "Time is required",
    })
    .min(1, "Time is required"),
  appointment: z
    .string({
      required_error: "Appointment type is required",
    })
    .min(1, "Appointment type is required"),
  id: z.string().optional(),
  key: z.number().optional(),
});

export const diseaseSchema = z.object({
  id: z.string().optional(),
  diagnose: z
    .string({
      required_error: "Diagnosis is required",
    })
    .min(1, "Diagnosis is required"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
  time: z
    .string({
      required_error: "Time is required",
    })
    .min(1, "Time is required"),
});

export const userDocumentSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required"),
  date: z
    .string({
      required_error: "Date is required",
    })
    .min(1, "Date is required"),
});

export const reportSchema = z.object({
  signed: z.boolean(),
  result: z.string(),
  status: z.string(),
  collBy: z.string(),
  handling: z.string(),
  cost: z.number(),
  priority: z.string(),
  lab: z.string(),
  test: z.string(),
  number: z.number(),
});
