const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const { protect } = require("../middleware/authMiddleware");

// GET all chats for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .select("title updatedAt");
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chats." });
  }
});

// GET single chat with all messages
router.get("/:chatId", protect, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.user._id,
    });
    if (!chat) return res.status(404).json({ message: "Chat not found." });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chat." });
  }
});

// POST create new chat
router.post("/", protect, async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.user._id,
      title: "New Chat",
      messages: [],
    });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to create chat." });
  }
});

// POST add message to existing chat
router.post("/:chatId/message", protect, async (req, res) => {
  try {
    const { sender, text } = req.body;
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.user._id,
    });
    if (!chat) return res.status(404).json({ message: "Chat not found." });

    // Auto-title from first user message
    if (chat.messages.length === 0 && sender === "user") {
      chat.title = text.length > 40 ? text.substring(0, 40) + "..." : text;
    }

    chat.messages.push({ sender, text });
    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to save message." });
  }
});

// DELETE a chat
router.delete("/:chatId", protect, async (req, res) => {
  try {
    await Chat.findOneAndDelete({
      _id: req.params.chatId,
      userId: req.user._id,
    });
    res.json({ message: "Chat deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete chat." });
  }
});

module.exports = router;
