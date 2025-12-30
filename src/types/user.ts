import { Appointment } from "./appointment";
import { Disease } from "./disease";
import { GeneralParams } from "./generalParams";
import { Document } from "./document";

export type UserRole = "admin" | "doctor" | "patient";

export type User = {
  _id: string;
  role: UserRole;
  name: string;
  specialization?: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  password: string;
  age?: number;
  avatarUrl: string;
  formattedAddress: string;
  medicalInfo?: {
    generalParams: GeneralParams[];
    medicalHistory: Disease[];
    appointments: Appointment[];
    documents: Document[];
  };
  userSettings: string[];
};

export type NewUser = Omit<User, "_id">;
