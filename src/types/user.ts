import { Appointment } from "./appointment";
import { Disease } from "./disease";
import { GeneralParams } from "./generalParams";

export type User = {
  _id: string;
  type: string;
  name: string;
  specialization?: string | null;
  dateOfBirth: string;
  gender: string,
  phone: string;
  email: string;
  password: string;
  age?: number;
  avatarUrl?: string;
  formattedAddress?: string;
  medicalInfo?: {
    generalParams: GeneralParams;
    medicalHistory: Disease[];
    appointments: Appointment[];
  };
};
