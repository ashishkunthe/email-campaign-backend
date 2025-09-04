import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplates,
  updateTemplate,
} from "../controller/templateController.js";

const router = Router();

router.get("/templates", authMiddleware as any, getTemplates as any);
router.post("/templates", authMiddleware as any, createTemplate as any);
router.get("/templates/:id", authMiddleware as any, getTemplateById as any);
router.put("/templates/:id", authMiddleware as any, updateTemplate as any);
router.delete("/templates/:id", authMiddleware as any, deleteTemplate as any);

export default router;
