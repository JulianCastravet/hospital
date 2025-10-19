import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  name: string;
  phone: string;
  email: string;
  diagnosis: string[];
}

const appointmentSchema = new Schema<IAppointment>(
  {
    name: { type: String, required: true },
    diagnosis: { type: [String], required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);
