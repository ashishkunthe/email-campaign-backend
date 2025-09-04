import express from "express";
import dotenv from "dotenv";
import { MongoDBConnection } from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import flowRoutes from "./routes/flowRoutes.js";
import templateRoutes from "./routes/templatesRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import rateLimit from "express-rate-limit";
import { agenda } from "./configs/agenda.js";
import sendEmailJob from "./jobs/sendEmailJob.js";
import executeNodeJob from "./jobs/executeNodeJob.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests, please slow down.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", flowRoutes);
app.use("/api", templateRoutes);
app.use("/api/contacts", contactRoutes);

sendEmailJob(agenda);
executeNodeJob(agenda);

const startServer = async () => {
  await MongoDBConnection();
  console.log("✅ MongoDB Connected");

  await agenda.start();
  console.log("🕒 Agenda started");

  app.listen(5000, () => {
    console.log("🚀 Server is running on port 5000");
  });
};

startServer();
