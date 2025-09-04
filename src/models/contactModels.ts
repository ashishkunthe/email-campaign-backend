import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  tags?: string[];
  owner: string;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    tags: { type: [String], default: [] },
    owner: { type: String, required: true },
  },
  { timestamps: true }
);

ContactSchema.index({ email: 1, owner: 1 }, { unique: true });

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
