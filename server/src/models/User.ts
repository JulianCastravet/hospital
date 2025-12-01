import mongoose, { Schema, Document } from "mongoose";
import { IAppointment } from "./Appointment";
import { v4 as uuid } from "uuid";

export interface GeneralParams {
  temperature: number;
  minBpm: number;
  maxBpm: number;
  avgBpm: number;
  day: string;
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

export interface UserDocument {
  id: string;
  title: string;
  date: string;
  url: string;
  cloudinaryId: string; // needed for deleting
  uploadedAt: Date;
}

// ------------------
// Subschemas
// ------------------

const DiseaseSchema = new Schema<Disease>(
  {
    id: {
      type: String,
      default: uuid, // generate disease id ourselves
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
    avgBpm: Number,
    day: String,
    bloodPressure: {
      min: Number,
      max: Number,
    },
  },
  { _id: false }
);

const UserDocumentSchema = new Schema<UserDocument>(
  {
    id: { type: String, default: uuid },
    title: String,
    date: Date,
    url: String,
    cloudinaryId: String, // needed for deleting
    uploadedAt: Date,
  },
  { _id: false } // disable Mongo’s auto _id
);

// ------------------
// User Schema
// ------------------

export type UserRole = "admin" | "doctor" | "patient";

export interface IUser extends Document {
  role: UserRole;
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
    generalParams: GeneralParams[];
    medicalHistory: Disease[];
    appointments: IAppointment[];
    documents: UserDocument[];
  };
  userSettings: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    // legacy field kept only so old documents with `type` still load;
    // new code should rely on `role` instead.
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
    },
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
    userSettings: {
      type: [String],
      default: [],
    },

    medicalInfo: {
      generalParams: [GeneralParamsSchema],
      medicalHistory: [DiseaseSchema],
      appointments: { type: Array },
      documents: [UserDocumentSchema],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
