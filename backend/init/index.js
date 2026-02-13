const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl = "mongodb://127.0.0.1:27017/universe";
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
  console.log("Connected to MongoDB");
}

const initDb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
  console.log("Database initialized with sample data");
};

initDb();
