import type { Request, Response } from "express";
import flowModels from "../models/flowModels.js";
import { agenda } from "../configs/agenda.js"; // Import Agenda instance

interface RequestUpdated extends Request {
  userId: string;
}

export async function executeFlow(req: RequestUpdated, res: Response) {
  const userId = req.userId;
  const flowId = req.params.id;

  try {
    const flow = await flowModels.findOne({ userId, _id: flowId });
    if (!flow) {
      return res.status(404).json({ message: "Flow not found" });
    }

    // Find the first node (could be "email" or "wait")
    const startNode = flow.nodes.find(
      (node) => node.type === "email" || node.type === "wait"
    );

    if (!startNode) {
      return res.status(400).json({ message: "No start node found in flow" });
    }

    // Schedule the first job
    if (startNode.type === "email") {
      await agenda.now("execute-node", { flowId, nodeId: startNode.id });
    } else if (startNode.type === "wait") {
      await agenda.schedule(`in ${startNode.data.delay}`, "execute-node", {
        flowId,
        nodeId: startNode.id,
      });
    }

    res.status(200).json({ message: "Flow execution started" });
  } catch (error) {
    console.error("Flow execution failed", error);
    res.status(500).json({ message: "Execution failed", error });
  }
}
