import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Sir");
});

app.listen(5000, () => {
  console.log("server is runnig on post 5000");
});
