const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { protect } = require("../middleware/authMiddleware");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");

// Rate limiter — max 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many attempts. Please try again after 15 minutes." },
});

// ─────────────────────────────────────────
// REGISTER
// POST /api/auth/register
// ─────────────────────────────────────────
router.post("/register", authLimiter, async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email, username, or phone already in use." });
    }

    const user = await User.create({ username, email, phone, password });
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err); // ✅ add this line
    res.status(500).json({
      message: "Server error during registration.",
      error: err.message,
    });
  }
});

// ─────────────────────────────────────────
// LOGIN
// POST /api/auth/login
// ─────────────────────────────────────────
router.post("/login", authLimiter, async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res
        .status(400)
        .json({ message: "Username/email and password are required." });
    }

    // Allow login with username OR email
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error during login.", error: err.message });
  }
});

// ─────────────────────────────────────────
// LOGOUT
// POST /api/auth/logout
// ─────────────────────────────────────────
router.post("/logout", (req, res) => {
  res.cookie("ayuverse_token", "", {
    httpOnly: true,
    expires: new Date(0), // immediately expire
  });
  res.json({ message: "Logged out successfully." });
});

// ─────────────────────────────────────────
// GET PROFILE (protected)
// GET /api/auth/profile
// ─────────────────────────────────────────
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

// ─────────────────────────────────────────
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// ─────────────────────────────────────────
router.post("/forgot-password", authLimiter, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // Don't reveal if email exists — security best practice
      return res.json({
        message: "If that email exists, a reset link has been sent.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // TODO: Send email with this link using Nodemailer/SendGrid
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;
    console.log("Reset link (dev only):", resetLink); // remove in production

    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// ─────────────────────────────────────────
// RESET PASSWORD
// PUT /api/auth/reset-password/:token
// ─────────────────────────────────────────
router.put("/reset-password/:token", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Reset link is invalid or has expired." });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    generateToken(res, user._id);
    res.json({ message: "Password reset successful. You are now logged in." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

module.exports = router;
