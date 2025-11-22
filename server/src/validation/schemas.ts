import { z } from "zod";

export const loginSchema = z.object({
  mail: z.string().email(),
  password: z.string().min(6),
});

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  dateOfBirth: z.string().min(1),
  type: z.string().min(1),
  specialization: z.string().optional(),
  formattedAddress: z.string().optional(),
  gender: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const appointmentSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email(),
  diagnosis: z.array(z.string()).optional(),
});

export const userAppointmentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  diagnosis: z.array(z.string()),
  doctor: z.string().min(1),
  time: z.string().min(1),
  appointment: z.string().min(1),
  id: z.string().optional(),
  key: z.number().optional(),
});

export const diseaseSchema = z.object({
  id: z.string().optional(),
  diagnose: z.string().min(1),
  description: z.string().min(1),
  time: z.string().min(1),
});

export const userDocumentSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
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
