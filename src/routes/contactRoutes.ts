import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import {
  addContact,
  deleteContact,
  getContacts,
  uploadContacts,
} from "../controller/contactController.js";

const router = Router();

router.post("/", authMiddleware as any, addContact as any);
router.get("/", authMiddleware as any, getContacts as any);
router.delete("/:id", authMiddleware as any, deleteContact as any);
router.post(
  "/upload",
  authMiddleware as any,
  upload.single("file"),
  uploadContacts as any
);

export default router;
