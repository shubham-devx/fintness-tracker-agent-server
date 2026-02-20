const express = require("express");
const router = express.Router();
const { generatePlan } = require("../services/aiService");

router.post("/generate", async (req, res) => {
  try {
    const result = await generatePlan(req.body);
    res.json({ plan: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;