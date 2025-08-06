import type { Request, Response } from "express";
import flowModels from "../models/flowModels.js";

interface RequestUpdated extends Request {
  userId: string;
}

// createFlow – Save new flow (POST)
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

//  getAllFlows – Return all flows for current user (GET)
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
//  getFlowById – Return a single flow (GET by ID)
export async function getFlowById(req: RequestUpdated, res: Response) {}
//  updateFlow – Update existing flow (PUT)
export async function updateFlow(req: RequestUpdated, res: Response) {}
//  deleteFlow
export async function deleteFlow(req: RequestUpdated, res: Response) {}
