import express from "express";
import dotenv from "dotenv";
import { MongoDBConnection } from "./configs/db";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Sir");
});

MongoDBConnection();

app.listen(5000, () => {
  console.log("server is runnig on post 5000");
});
