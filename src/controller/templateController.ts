import type { Request, Response } from "express";
import { Template } from "../models/templateModel.js";

interface RequestExtends extends Request {
  userId: string;
}

export const getTemplates = async (req: RequestExtends, res: Response) => {
  try {
    const userId = req.userId;
    const templates = await Template.find({
      $or: [{ global: true }, { owner: userId }],
    });
    res.json({ templates });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

export const createTemplate = async (req: RequestExtends, res: Response) => {
  try {
    const { name, subject, body } = req.body;
    const newTemplate = await Template.create({
      name,
      body,
      subject,
      owner: req.userId,
    });
    res
      .status(201)
      .json({ message: "Template created", template: newTemplate });
  } catch (err) {
    res.status(500).json({ message: "Failed to create template" });
  }
};

export const getTemplateById = async (req: RequestExtends, res: Response) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: "Not found" });
    res.json({ template });
  } catch {
    res.status(500).json({ message: "Error fetching template" });
  }
};

export const updateTemplate = async (req: RequestExtends, res: Response) => {
  try {
    const template = await Template.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true }
    );
    if (!template) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Template updated", template });
  } catch {
    res.status(500).json({ message: "Failed to update template" });
  }
};

export const deleteTemplate = async (req: RequestExtends, res: Response) => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!template) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Template deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete template" });
  }
};
