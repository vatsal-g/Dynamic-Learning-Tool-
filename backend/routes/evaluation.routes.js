const express = require("express");
const { evaluateAnswer } = require("../services/gemini.service");

console.log("✅ evaluation.routes.js loaded");

const router = express.Router();

router.post("/evaluate", async (req, res) => {
  const { question, answer } = req.body;
  const feedback = await evaluateAnswer(question, answer);
  res.json({ feedback });
});

module.exports = router;
