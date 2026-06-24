// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing");
// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));

// const mongoUrl = "mongodb://127.0.0.1:27017/universe";
// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(mongoUrl);
//   console.log("Connected to MongoDB");
// }

// require("dotenv").config();

// // const { GoogleGenerativeAI } = require("@google/generative-ai");
// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const Groq = require("groq-sdk");
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// //My Server Port
// const PORT = 8080;

// //root route
// app.get("/", (req, res) => {
//   res.send("AyuVerse Backend Server is Running");
// });

// //Index all listings route
// app.get("/listings", async (req, res) => {
//   const allListings = await Listing.find({});
//   res.send(allListings);
// });

// //Show route for plants id:one
// app.get("/listings/:name", async (req, res) => {
//   try {
//     const plant = await Listing.findOne({
//       plantName: req.params.name,
//     });

//     if (!plant) {
//       return res.status(404).json({ message: "Plant not found" });
//     }

//     res.json(plant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Show route for plants by type: vata, pitta, kapha

// app.get("/listings/tour/:dosha", async (req, res) => {
//   try {
//     const plants = await Listing.find({
//       dosha: req.params.dosha.toLowerCase(),
//     });

//     res.json(plants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Diet Chart Generation Route
// app.post("/api/diet/generate", async (req, res) => {
//   try {
//     const { dosha, age, weight, healthGoal, allergies, season } = req.body;

//     if (!dosha) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Dosha type is required." });
//     }

//     const prompt = `
// You are an expert Ayurvedic nutritionist. Generate a personalized Ayurvedic diet chart.

// Patient Details:
// - Dosha Type: ${dosha}
// - Age: ${age || "Not specified"}
// - Weight: ${weight ? weight + " kg" : "Not specified"}
// - Health Goal: ${healthGoal || "General Wellness"}
// - Season: ${season || "Summer"}
// - Allergies/Avoid: ${allergies || "None"}

// Return ONLY a valid JSON object (no markdown, no backticks) in this exact format:
// {
//   "overview": "2-3 sentence personalized overview",
//   "meals": {
//     "breakfast": { "name": "Breakfast", "time": "7:00 - 8:00 AM", "items": ["item1", "item2", "item3"], "tip": "ayurvedic tip" },
//     "midMorning": { "name": "Mid Morning", "time": "10:00 - 11:00 AM", "items": ["item1", "item2"], "tip": "tip" },
//     "lunch": { "name": "Lunch", "time": "12:00 - 1:00 PM", "items": ["item1", "item2", "item3", "item4"], "tip": "tip" },
//     "evening": { "name": "Evening Snack", "time": "4:00 - 5:00 PM", "items": ["item1", "item2"], "tip": "tip" },
//     "dinner": { "name": "Dinner", "time": "7:00 - 8:00 PM", "items": ["item1", "item2", "item3"], "tip": "tip" }
//   },
//   "avoid": ["food1", "food2", "food3"],
//   "herbs": ["herb1", "herb2", "herb3", "herb4"],
//   "dailyTips": ["tip1", "tip2", "tip3"]
// }`;

//     //const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
//     // const result = await model.generateContent(prompt);
//     // const responseText = result.response.text();

//     const chatCompletion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     });
//     const responseText = chatCompletion.choices[0].message.content;

//     const cleanedText = responseText
//       .replace(/```json/gi, "")
//       .replace(/```/g, "")
//       .trim();
//     const dietChart = JSON.parse(cleanedText);

//     res.status(200).json({ success: true, dietChart });
//   } catch (error) {
//     console.error("Diet chart error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to generate diet chart." });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

// ── Security Middleware ──────────────────────────────────
app.use(helmet());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // ✅ Required for cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ── Body & Cookie Parsers ────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // ✅ Must be before routes

// ── MongoDB ──────────────────────────────────────────────
const mongoUrl = process.env.MONGO_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoUrl);
  console.log("✅ Connected to MongoDB");
}

// ── Groq AI ──────────────────────────────────────────────
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── Models ───────────────────────────────────────────────
const Listing = require("./models/listing");

// ── Routes ───────────────────────────────────────────────
// ✅ NEW: Auth routes
const authRoutes = require("./controller/authController");
app.use("/api/auth", authRoutes);

// Existing routes below — untouched
app.get("/", (req, res) => {
  res.send("AyuVerse Backend Server is Running");
});

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.send(allListings);
});

app.get("/listings/:name", async (req, res) => {
  try {
    const plant = await Listing.findOne({ plantName: req.params.name });
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/listings/tour/:dosha", async (req, res) => {
  try {
    const plants = await Listing.find({
      dosha: req.params.dosha.toLowerCase(),
    });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/diet/generate", async (req, res) => {
  try {
    const { dosha, age, weight, healthGoal, allergies, season } = req.body;

    if (!dosha) {
      return res
        .status(400)
        .json({ success: false, message: "Dosha type is required." });
    }

    const prompt = `
You are an expert Ayurvedic nutritionist. Generate a personalized Ayurvedic diet chart.

Patient Details:
- Dosha Type: ${dosha}
- Age: ${age || "Not specified"}
- Weight: ${weight ? weight + " kg" : "Not specified"}
- Health Goal: ${healthGoal || "General Wellness"}
- Season: ${season || "Summer"}
- Allergies/Avoid: ${allergies || "None"}

Return ONLY a valid JSON object (no markdown, no backticks) in this exact format:
{
  "overview": "2-3 sentence personalized overview",
  "meals": {
    "breakfast": { "name": "Breakfast", "time": "7:00 - 8:00 AM", "items": ["item1", "item2", "item3"], "tip": "ayurvedic tip" },
    "midMorning": { "name": "Mid Morning", "time": "10:00 - 11:00 AM", "items": ["item1", "item2"], "tip": "tip" },
    "lunch": { "name": "Lunch", "time": "12:00 - 1:00 PM", "items": ["item1", "item2", "item3", "item4"], "tip": "tip" },
    "evening": { "name": "Evening Snack", "time": "4:00 - 5:00 PM", "items": ["item1", "item2"], "tip": "tip" },
    "dinner": { "name": "Dinner", "time": "7:00 - 8:00 PM", "items": ["item1", "item2", "item3"], "tip": "tip" }
  },
  "avoid": ["food1", "food2", "food3"],
  "herbs": ["herb1", "herb2", "herb3", "herb4"],
  "dailyTips": ["tip1", "tip2", "tip3"]
}`;

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const responseText = chatCompletion.choices[0].message.content;
    const cleanedText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    const dietChart = JSON.parse(cleanedText);

    res.status(200).json({ success: true, dietChart });
  } catch (error) {
    console.error("Diet chart error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate diet chart." });
  }
});

// ── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
