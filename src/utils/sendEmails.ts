import nodemailer from "nodemailer";
import EmailLogs from "../models/emailLogs.js";

export async function sendEmail({
  to,
  subject,
  text,
  html,
  flowId,
  nodeId,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  flowId: string;
  nodeId: string;
}) {
  const transport = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transport.sendMail({
      from: "SendWeave",
      to: to,
      subject: subject,
      html: html,
      text: text,
    });

    await EmailLogs.create({
      to,
      subject,
      text,
      html,
      flowId,
      nodeId,
      status: "sent",
    });
  } catch (error: any) {
    await EmailLogs.create({
      to,
      subject,
      text,
      html,
      flowId,
      nodeId,
      status: "failed",
      error: error.message,
    });

    throw error;
  }
}
