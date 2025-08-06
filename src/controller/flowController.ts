import type { Request, Response } from "express";
import flowModels from "../models/flowModels.js";

interface RequestUpdated extends Request {
  userId: string;
}

// createFlow
export async function createFlow(req: RequestUpdated, res: Response) {
  const { name, nodes, edges } = req.body;
  const userId = req.userId;
  try {
    await flowModels.create({
      userId: userId,
      name: name,
      nodes,
      edges,
    });
    res.status(200).json({
      message: "Flow created sucessfully",
    });
  } catch (error) {
    console.log("Error in creating the flow", error);
    res.status(500).json({
      message: "Error in creating flow! try again",
    });
  }
}

//  getAllFlows
export async function getAllFlows(req: RequestUpdated, res: Response) {
  const userId = req.userId;

  try {
    const flows = await flowModels.find({ userId: userId });

    if (flows.length === 0) {
      return res.status(404).json({
        message: "No flows found for this user",
      });
    }

    res.json({
      message: "Here are all the flow created by you",
      flows: flows,
    });
  } catch (error) {
    console.log("Not able to fetch the flows", error);
    res.status(500).json({
      message: "Not able to fetch the flows",
    });
  }
}
//  getFlowById
export async function getFlowById(req: RequestUpdated, res: Response) {
  const userId = req.userId;
  const flowId = req.params.id;

  try {
    const flow = await flowModels.findById(flowId);

    if (!flow || flow.userId.toString() !== userId) {
      return res.status(404).json({
        message: "Flow not found",
      });
    }

    res.status(200).json({
      message: "Flow sucessfully fetched",
      flow: flow,
    });
  } catch (error) {
    console.log("Error fetching requested flow", error);
    res.status(500).json({
      message: "Error fetching requested flow",
    });
  }
}
//  updateFlow
export async function updateFlow(req: RequestUpdated, res: Response) {
  const userId = req.userId;
  const flowId = req.params.id;
  const { name, nodes, edges } = req.body;

  try {
    const existingFlow = await flowModels.findById(flowId);

    if (!existingFlow || existingFlow.userId.toString() !== userId) {
      return res.status(404).json({
        message: "Flow not found",
      });
    }

    existingFlow.name = name;
    existingFlow.nodes = nodes;
    existingFlow.edges = edges;

    await existingFlow.save();

    res.status(200).json({
      message: "Flow update successful",
    });
  } catch (error) {
    console.log("Unable to update the flow", error);
    res.status(500).json({
      message: "Unable to update the flow",
    });
  }
}

//  deleteFlow
export async function deleteFlow(req: RequestUpdated, res: Response) {
  const userId = req.userId;
  const flowId = req.params.id;

  try {
    const findFlow = await flowModels.findById(flowId);

    if (!findFlow || findFlow.userId.toString() !== userId) {
      return res.status(403).json({
        message: "The flow  not found",
      });
    }

    await flowModels.findByIdAndDelete(flowId);

    res.status(200).json({
      message: "Flow successfully deleted",
    });
  } catch (error) {
    console.log("Error in deleting the flow", error);
    res.status(500).json({
      message: "Error in deleting flow",
    });
  }
}
