import express from "express";
import dotenv from "dotenv";
import { MongoDBConnection } from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);

app.listen(5000, async () => {
  await MongoDBConnection();
  console.log("server is runnig on post 5000");
});
