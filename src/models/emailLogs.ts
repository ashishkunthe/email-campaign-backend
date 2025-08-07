import mongoose, { Schema } from "mongoose";

interface IEmailLog extends Document {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  status: "sent" | "failed";
  error?: string;
  flowId?: mongoose.Types.ObjectId;
  nodeId?: string;
}

const emailLogSchema = new Schema<IEmailLog>(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: String,
    html: String,
    status: { type: String, enum: ["sent", "failed"], required: true },
    error: String,
    flowId: { type: Schema.Types.ObjectId, ref: "Flow" },
    nodeId: String,
  },
  { timestamps: true }
);

const EmailLogs = mongoose.model("EmailSchema", emailLogSchema);

export default EmailLogs;
