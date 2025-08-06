import mongoose, { Schema, Document } from "mongoose";

const nodeSchema = new Schema(
  {
    id: String,
    type: String,
    position: {
      x: Number,
      y: Number,
    },
    data: Schema.Types.Mixed,
  },
  { _id: false }
);

const edgeSchema = new Schema(
  {
    id: String,
    source: String,
    target: String,
    sourceHandle: String,
    targetHandle: String,
  },
  { _id: false }
);

export interface IFlow extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  nodes: {
    id: string;
    type: string;
    position: {
      x: number;
      y: number;
    };
    data: any;
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
  }[];
}

const flowSchema = new Schema<IFlow>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    nodes: [nodeSchema],
    edges: [edgeSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IFlow>("Flow", flowSchema);
