const express = require("express");
const router = express.Router();
const { generatePlan } = require("../services/aiService");

router.post("/generate", async (req, res) => {
  try {

    const {
      age,
      weight,
      height,
      goal,
      experience,
      dietType,
      workoutType,
      foodLog
    } = req.body;

    // Debug log (check in Render logs)
    console.log("Incoming Request Data:", req.body);

    // Basic validation
    if (!age || !weight || !height || !goal || !experience) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    const result = await generatePlan({
      age,
      weight,
      height,
      goal,
      experience,
      dietType,
      workoutType,
      foodLog
    });

    res.json({
      success: true,
      plan: result
    });

  } catch (error) {

    console.error("Agent Route Error:", error);

    res.status(500).json({
      success: false,
      error: "AI plan generation failed"
    });
  }
});

module.exports = router;