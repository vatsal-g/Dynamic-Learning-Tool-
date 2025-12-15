console.log("🔑 Gemini key loaded:", process.env.GEMINI_API_KEY?.slice(0, 6));
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

const questionPrompt = fs.readFileSync(
  path.join(__dirname, "../prompts/question.prompt.txt"),
  "utf8"
);

const evaluationPrompt = fs.readFileSync(
  path.join(__dirname, "../prompts/evaluation.prompt.txt"),
  "utf8"
);

async function generateQuestions(documentText) {
  const prompt = questionPrompt.replace("{{DOCUMENT}}", documentText);
  const result = await model.generateContent(prompt);
  return result.response
    .text()
    .split("\n")
    .map(q => q.replace(/^[0-9]+[.)]/, "").trim())
    .filter(Boolean);
}

async function evaluate(question) {
  const prompt = evaluationPrompt
    .replace("{{QUESTION}}", question)
    

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { generateQuestions, evaluate};
