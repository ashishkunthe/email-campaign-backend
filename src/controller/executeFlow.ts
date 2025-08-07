import type { Request, Response } from "express";
import flowModels from "../models/flowModels";
import { sendEmail } from "../utils/sendEmails";

interface RequestUpdated extends Request {
  userId: string;
}

export async function executeFlow(req: RequestUpdated, res: Response) {
  const userId = req.userId;
  const flowId = req.params.id;
  const { to, subject, body } = req.body;

  try {
    const flow = await flowModels.findOne({ userId: userId, _id: flowId });

    if (!flow) {
      return res.status(404).json({ message: "Flow not found" });
    }

    // @ts-check
    const emailNode = flow.nodes.find((node) => node.type === "email");

    if (!emailNode) {
      return res.status(400).json({ message: "No email node found in flow" });
    }

    const finalSubject = subject || emailNode.data.subject;
    const finalBody = body || emailNode.data.body;

    if (!to || !finalSubject || !finalBody) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await sendEmail({
      to: to,
      subject: finalSubject,
      html: `<p>${finalBody}</p>`,
      // @ts-ignore
      flowId: flow._id.toString(),
      nodeId: emailNode.id,
    });
    res.status(200).json({ message: "Flow executed and email sent" });
  } catch (error) {
    console.error("Flow execution failed", error);
    res.status(500).json({ message: "Execution failed", error: error });
  }
}
