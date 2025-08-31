import mongoose, { Schema, Document } from "mongoose";

export interface ITemplate extends Document {
  name: string;
  subject: string;
  body: string;
  global: boolean;
  owner: string;
}

const TemplateSchema = new Schema<ITemplate>(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    global: { type: Boolean, default: false },
    owner: { type: String },
  },
  { timestamps: true }
);

export const Template = mongoose.model<ITemplate>("Template", TemplateSchema);
