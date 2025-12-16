const express = require("express");
const router = express.Router();

const { generateFromText } = require("../services/gemini.service");

console.log("📄 document.routes.js loaded");

router.post("/generate-from-text", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const result = await generateFromText(text);
    res.json({ result });

  } catch (err) {
    console.error("🔥 ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
