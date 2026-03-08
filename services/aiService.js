const axios = require("axios");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const callAI = async (prompt) => {
  const response = await axios.post(
    GROQ_URL,
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.6
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
};

const generatePlan = async (data) => {

  const { age, weight, height, goal, experience, dietType, workoutType, foodLog } = data;

  const heightMeters = height / 100;
  const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);

  // Workout Agent
  const workoutPrompt = `
You are a professional fitness trainer.

User experience: ${experience}
Goal: ${goal}
Workout Type: ${workoutType}

If workout type is Yoga → only yoga poses.
If workout type is Weight Training → only gym exercises.

Create a structured 7-day workout plan.
`;

  // Diet Agent
  const dietPrompt = `
You are a nutrition expert.

Goal: ${goal}
Diet Preference: ${dietType}

If vegetarian → no meat, eggs, fish.
If non-vegetarian → include eggs, chicken, fish.

Create Indian diet plan:

Breakfast
Lunch
Snacks
Dinner
`;

  // Calorie Agent
  const caloriePrompt = `
Calculate calories for this food log.

Food:
${foodLog}

Return list of foods with calories and total calories.
`;

  const workoutPlan = await callAI(workoutPrompt);
  const dietPlan = await callAI(dietPrompt);
  const calorieData = await callAI(caloriePrompt);

  return `
# BMI
${bmi}

# Workout Plan
${workoutPlan}

# Diet Plan
${dietPlan}

# Calorie Breakdown
${calorieData}

# Motivation Tip
Consistency beats intensity. Stick to the plan daily.
`;
};

module.exports = { generatePlan };