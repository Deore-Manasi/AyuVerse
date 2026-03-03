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

app.use(express.urlencoded({ extended: true }));

//My Server Port
const PORT = 8080;

//root route
app.get("/", (req, res) => {
  res.send("AyuVerse Backend Server is Running");
});

//Index all listings route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.send(allListings);
});

//Show route for plants id:one
app.get("/listings/:name", async (req, res) => {
  try {
    const plant = await Listing.findOne({
      plantName: req.params.name,
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Show route for plants by type: vata, pitta, kapha

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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
