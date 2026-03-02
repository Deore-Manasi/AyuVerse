const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  plantName: { type: String, required: true },
  plantSize: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (val) =>
      val === ""
        ? "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : val,
  },
  nativeRegion: String,
  preferredClimate: String,
  reqSunlight: String,
  reqSoil: String,
  partMedicine: String,
  activeCompounds: String,
  therapeuticProp: String,
  dosageForm: String,
  glb3D: String,
  ayushApp: {
    ayurveda: String,
    unani: String,
    siddha: String,
  },
  benefits: {
    a: String,
    b: String,
    c: String,
    d: String,
  },
  family: String,
  dosha: String,
  genus: String,
  size: String,
  voiceDesc: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
