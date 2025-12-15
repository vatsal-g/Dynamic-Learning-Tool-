console.log("🔥🔥 document.routes.js LOADED 🔥🔥");

const express = require("express");
const multer = require("multer");
const upload = multer();

const { generateQuestions } = require("../services/gemini.service");

const router = express.Router();

router.post("/generate-questions", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }

  const text = req.file.buffer.toString("utf-8");
  const questions = await generateQuestions(text);

  res.json({ questions });
});

module.exports = router;
