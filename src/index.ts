import express from "express";
import dotenv from "dotenv";
import { MongoDBConnection } from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests, please slow down.",
  standardHeaders: true,
  legacyHeaders: false,
});

dotenv.config();

const app = express();

app.use(globalLimiter);
app.use("/api/auth", authRoutes);

app.listen(5000, async () => {
  await MongoDBConnection();
  console.log("server is runnig on post 5000");
});
