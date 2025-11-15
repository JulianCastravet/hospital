import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  type: string;
  name: string;
  dateOfBirth: string;
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
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    phone: { type: String, required: false },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    specialization: { type: String, required: false },
    age: { type: Number, required: false },
    avatarUrl: {
      data: Buffer,
      contentType: String,
    },
    formattedAddress: { type: String, required: false },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
