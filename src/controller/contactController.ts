import csvParser from "csv-parser";
import fs from "fs";
import multer from "multer";
import { Contact } from "../models/contactModels.js";
import type { Request, Response } from "express";

interface RequestExtends extends Request {
  userId: string;
}

// Add single contact
export const addContact = async (req: RequestExtends, res: Response) => {
  try {
    const { name, email, tags } = req.body;
    const contact = await Contact.create({
      name,
      email,
      tags: tags || [],
      owner: req.userId,
    });
    res.status(201).json({ message: "Contact added", contact });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to add contact" });
  }
};

// Get all contacts
export const getContacts = async (req: RequestExtends, res: Response) => {
  try {
    const contacts = await Contact.find({ owner: req.userId });
    res.json({ contacts });
  } catch {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

// Delete contact
export const deleteContact = async (req: RequestExtends, res: Response) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

// CSV Upload
export const uploadContacts = async (req: RequestExtends, res: Response) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const contacts: any[] = [];
  const errors: any[] = [];

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (row) => {
      if (row.email && row.name) {
        contacts.push({
          name: row.name,
          email: row.email,
          tags: row.tags ? row.tags.split(",") : [],
          owner: req.userId,
        });
      } else {
        errors.push(row);
      }
    })
    .on("end", async () => {
      try {
        await Contact.insertMany(contacts, { ordered: false });
        // @ts-ignore
        fs.unlinkSync(req.file.path);
        res.json({
          message: "Contacts uploaded",
          added: contacts.length,
          errors: errors.length,
        });
      } catch (err: any) {
        res.status(500).json({ message: err.message || "Upload failed" });
      }
    });
};
