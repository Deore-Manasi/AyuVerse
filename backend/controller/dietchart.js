const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateDietChart = async (req, res) => {
  try {
    const { dosha, age, weight, healthGoal, allergies, season } = req.body;

    if (!dosha) {
      return res
        .status(400)
        .json({ success: false, message: "Dosha type is required." });
    }

    const prompt = `
You are an expert Ayurvedic nutritionist. Generate a detailed personalized Ayurvedic diet chart.

Patient Details:
- Dosha Type: ${dosha}
- Age: ${age || "Not specified"}
- Weight: ${weight ? weight + " kg" : "Not specified"}
- Health Goal: ${healthGoal || "General Wellness"}
- Season: ${season || "Summer"}
- Allergies/Avoid: ${allergies || "None"}

Return ONLY a valid JSON object (no markdown, no backticks, no explanation) in this exact format:
{
  "overview": "2-3 sentence personalized overview of this diet plan for the patient",
  "meals": {
    "breakfast": {
      "name": "Breakfast",
      "time": "7:00 - 8:00 AM",
      "items": ["food item 1", "food item 2", "food item 3", "food item 4"],
      "tip": "short ayurvedic tip for breakfast"
    },
    "midMorning": {
      "name": "Mid Morning",
      "time": "10:00 - 11:00 AM",
      "items": ["food item 1", "food item 2"],
      "tip": "short tip"
    },
    "lunch": {
      "name": "Lunch",
      "time": "12:00 - 1:00 PM",
      "items": ["food item 1", "food item 2", "food item 3", "food item 4", "food item 5"],
      "tip": "short ayurvedic tip for lunch"
    },
    "evening": {
      "name": "Evening Snack",
      "time": "4:00 - 5:00 PM",
      "items": ["food item 1", "food item 2"],
      "tip": "short tip"
    },
    "dinner": {
      "name": "Dinner",
      "time": "7:00 - 8:00 PM",
      "items": ["food item 1", "food item 2", "food item 3", "food item 4"],
      "tip": "short ayurvedic tip for dinner"
    }
  },
  "avoid": ["food to avoid 1", "food to avoid 2", "food to avoid 3", "food to avoid 4"],
  "herbs": ["herb/spice 1", "herb/spice 2", "herb/spice 3", "herb/spice 4", "herb/spice 5"],
  "dailyTips": [
    "wellness tip 1",
    "wellness tip 2",
    "wellness tip 3"
  ]
}

Make sure all recommendations are:
1. Specific to the ${dosha} dosha
2. Appropriate for the ${season} season
3. Aligned with the goal: ${healthGoal || "General Wellness"}
4. Exclude any items from allergies: ${allergies || "None"}
5. Based on authentic Ayurvedic principles
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean response - remove markdown code blocks if present
    const cleanedText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let dietChart;
    try {
      dietChart = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      dietChart,
    });
  } catch (error) {
    console.error("Diet chart generation error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while generating diet chart.",
    });
  }
};

module.exports = { generateDietChart };
