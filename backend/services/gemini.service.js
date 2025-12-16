console.log("🧠 MOCK AI ENGINE ACTIVE");

// ✅ STRICT question detection
function isQuestion(text) {
  const t = text.trim().toLowerCase();
  return (
    t.endsWith("?") ||
    t.startsWith("what ") ||
    t.startsWith("why ") ||
    t.startsWith("how ") ||
    t.startsWith("when ") ||
    t.startsWith("where ") ||
    t.startsWith("who ")
  );
}

// ✅ Fact database
const FACTS = {
  "capital of india": "New Delhi",
  "capital of france": "Paris",
  "capital of usa": "Washington, D.C.",
  "capital of uk": "London"
};

function answerFact(text) {
  const clean = text
    .toLowerCase()
    .replace("what is the ", "")
    .replace("?", "")
    .trim();

  return FACTS[clean] || "I do not have a direct factual answer for this question.";
}

// ✅ Topic explanation (dynamic, not fixed template)
function explainTopic(topic) {
  return `${topic} is an important subject that can be understood by examining its meaning, real-world applications, and relevance. 
It is commonly studied to build conceptual clarity and practical understanding.
Learning about ${topic} helps individuals apply it effectively and recognize its importance in academic and real-life contexts.`;
}

function generateQuestions(topic) {
  return [
    `What does ${topic} mean?`,
    `Why is ${topic} important?`,
    `Where is ${topic} commonly used?`,
    `What are the main components of ${topic}?`,
    `What challenges are associated with ${topic}?`
  ];
}

async function generateFromText(text) {
  // 🟢 QUESTION MODE
  if (isQuestion(text)) {
    return answerFact(text);
  }

  // 🟢 TOPIC MODE
  return {
    explanation: explainTopic(text),
    questions: generateQuestions(text)
  };
}

module.exports = { generateFromText };
