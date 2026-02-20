require("dotenv").config();
const express = require("express");
const cors = require("cors");

const agentRoute = require("./routes/agentRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/agent/generate", agentRoute);

app.get("/", (req, res) => {
  res.send("AI Gym Agent Running 💪");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});