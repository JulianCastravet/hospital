import mongoose, { Schema, Document } from "mongoose";
import { IAppointment } from "./Appointment";
import { v4 as uuid } from "uuid";

export interface GeneralParams {
  temperature: number;
  minBpm: number;
  maxBpm: number;
  bloodPressure: {
    min: number;
    max: number;
  };
}

export interface Disease {
  id: string;
  diagnose: string;
  description: string;
  time: string;
}

// ------------------
// Subschemas
// ------------------

const DiseaseSchema = new Schema<Disease>(
  {
    id: {
      type: String,
      default: uuid,  // generate disease id ourselves
    },
    diagnose: String,
    description: String,
    time: String,
  },
  { _id: false } // disable Mongo’s auto _id
);

const GeneralParamsSchema = new Schema<GeneralParams>(
  {
    temperature: Number,
    minBpm: Number,
    maxBpm: Number,
    bloodPressure: {
      min: Number,
      max: Number,
    },
  },
  { _id: false }
);

// ------------------
// User Schema
// ------------------

export interface IUser extends Document {
  type: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  password: string;
  specialization?: string;
  age: number;
  avatarUrl?: {
    data: Buffer;
    contentType: string;
  };
  formattedAddress: string;
  medicalInfo?: {
    generalParams: GeneralParams;
    medicalHistory: Disease[];
    appointments: IAppointment[];
  };
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    phone: String,
    gender: String,
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    specialization: String,
    age: Number,

    avatarUrl: {
      data: Buffer,
      contentType: String,
    },

    formattedAddress: String,

    medicalInfo: {
      generalParams: GeneralParamsSchema,
      medicalHistory: [DiseaseSchema],  // <-- ARRAY of subdocuments
      appointments: { type: Array },    // you can also make a schema here later
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
