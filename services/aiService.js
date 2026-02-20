const axios = require("axios");

const generatePlan = async (data) => {
  try {
    // ✅ Real BMI Calculation (Backend Logic)
    const heightInMeters = data.height / 100;
    const bmi = (data.weight / (heightInMeters * heightInMeters)).toFixed(1);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a professional certified fitness trainer."
          },
          {
            role: "user",
            content: `
Return the response in structured format using clear headings:

# BMI
# Daily Calories
# Weekly Split
# Workout Plan
# Diet Plan
# Motivation Tips

User Details:
Age: ${data.age}
Weight: ${data.weight} kg
Height: ${data.height} cm
Goal: ${data.goal}
Experience: ${data.experience}

Calculated BMI: ${bmi}

Create a detailed 7-day workout and Indian diet plan.
`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.log("GROQ ERROR:", error.response?.data || error.message);
    throw new Error("AI generation failed");
  }
};

module.exports = { generatePlan };