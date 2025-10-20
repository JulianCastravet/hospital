import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  signed: boolean;
  result: string;
  status: string;
  collBy: string;
  handling: string;
  cost: string;
  priority: string;
  lab: string;
  test: string;
  number: number;
}

const reportSchema = new Schema<IReport>(
  {
    signed: { type: Boolean },
    result: { type: String },
    status: { type: String },
    collBy: { type: String },
    handling: { type: String },
    cost: { type: String },
    priority: { type: String },
    lab: { type: String },
    test: { type: String },
    number: { type: Number },
  },
  { timestamps: true }
);

export const Report = mongoose.model<IReport>("Report", reportSchema);
