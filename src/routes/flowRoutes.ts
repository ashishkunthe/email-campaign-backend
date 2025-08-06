import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createFlow,
  deleteFlow,
  getAllFlows,
  getFlowById,
  updateFlow,
} from "../controller/flowController.js";

const router = Router();

router.post("/flows", authMiddleware as any, createFlow as any);
router.get("/flows", authMiddleware as any, getAllFlows as any);
router.get("/flows/:id", authMiddleware as any, getFlowById as any);
router.put("/flows/:id", authMiddleware as any, updateFlow as any);
router.delete("/flows/:id", authMiddleware as any, deleteFlow as any);

export default router;
