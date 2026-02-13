const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const mongoUrl = "mongodb://127.0.0.1:27017/universe";
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
  console.log("Connected to MongoDB");
}

//My Server Port
const PORT = 8080;

app.get("/api", (req, res) => {
  res.send("AyuVerse Backend Server is Running");
});

app.get("/api/listings", async (req, res) => {
  let sampleListings = new Listing({
    plantName: "Ashwagandha",
    plantSize: "Medium",
    nativeRegion: "India, Middle East, and parts of Africa",
    preferredClimate: "Tropical and subtropical climates",
    reqSunlight: "Full sun to partial shade",
    reqSoil: "Well-drained, sandy or loamy soil",
    partMedicine: "Roots",
    activeCompounds: "Withanolides, alkaloids, and saponins",
    therapeuticProp:
      "Adaptogenic, anti-inflammatory, and antioxidant properties",
    dosageForm: "Powder, capsules, and tinctures",
    glb3D: "https://example.com/ashwagandha-3d-model.glb",
    ayushApp: {
      ayurveda:
        "Ashwagandha is a key herb in Ayurveda, used for its rejuvenating and adaptogenic properties.",
      unani:
        "In Unani medicine, Ashwagandha is used to enhance vitality and treat various ailments.",
      siddha:
        "Siddha medicine utilizes Ashwagandha for its therapeutic benefits in managing stress and promoting overall health.",
    },
    benefits: {
      a: "Reduces stress and anxiety",
      b: "Improves sleep quality",
      c: "Enhances cognitive function",
      d: "Boosts immune system",
    },
    family: "Solanaceae",
    genus: "Withania",
    size: "Medium",
    voiceDesc:
      "Ashwagandha is a versatile herb known for its adaptogenic properties, helping the body manage stress and promote overall well-being.",
  });
  await sampleListings.save();
  console.log("Sample listing saved to database");
  res.send("Sample listing added to database");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
