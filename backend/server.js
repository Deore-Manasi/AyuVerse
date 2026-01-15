const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//My Server Port
const PORT = 8080;

app.get("/api", (req, res) => {
  res.send("AyuVerse Backend Server is Running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
