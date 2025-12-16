const express = require("express");
const router = express.Router();

const { generateFromText } = require("../services/gemini.service");

console.log("📄 document.routes.js loaded");

router.post("/generate-from-text", async (req, res) => {
  console.log("bhaag rha h");

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const result = await generateFromText(text);

    // ✅ Question mode (string)
    if (typeof result === "string") {
      return res.json({
        explanation: result
      });
    }

    // ✅ Topic mode (object)
    return res.json({
      explanation: result.explanation,
      questions: result.questions
    });

  } catch (err) {
    console.error("🔥 ERROR:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
