🚀 Dynamic Learning Tool (Intent-Aware AI Backend)

A Dynamic Learning Tool that intelligently responds to user input by understanding intent, rather than blindly generating static answers.

Unlike traditional chatbots, this system:

Answers direct factual questions directly

Explains conceptual topics in depth

Generates learning questions for educational content

The architecture is intentionally designed with a Mock AI Engine to ensure stability, fairness in evaluation, and seamless upgrade to the Gemini API.

🧠 Key Idea (Why this project is different)

Most AI tools respond the same way to every input.
This project introduces intent-aware routing:

Input Type	System Behaviour
Factual question	Returns a direct answer
Conceptual topic	Gives detailed explanation + questions
Learning content	Generates explanation + assessment

This makes the tool educationally useful, not just conversational.

🗂️ Project Structure (Exact Match)
Dynamic-Learning-Tool/
│
├── backend/
│   ├── routes/
│   │   ├── document.routes.js
│   │   └── evaluation.routes.js
│   │
│   ├── services/
│   │   └── gemini.service.js   ← Mock / Gemini logic
│   │
│   ├── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── index.html
│   ├── index.css
│   ├── index.js
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.js
│
└── .gitignore

⚙️ Tech Stack
Backend

Node.js

Express.js

REST APIs

Mock AI Engine (Gemini-ready)

Frontend

HTML

CSS

Vanilla JavaScript

Axios (via CDN)

AI Layer

Mock Gemini Engine

Prompt-based logic

Easily replaceable with real Gemini API

🔌 Backend API Endpoints
1️⃣ Generate from Text (Main Feature)

POST

http://localhost:8080/api/document/generate-from-text


Body (JSON):

{
  "text": "What is the capital of India?"
}


Example Responses:

✔ Factual:

{
  "result": "New Delhi"
}


✔ Conceptual:

{
  "explanation": "Artificial Intelligence is the field...",
  "questions": [
    "What is AI?",
    "How does ML differ from AI?",
    "Why is data important?",
    "What are real-world applications?",
    "What limitations exist?"
  ]
}

2️⃣ Evaluation Endpoint (Optional / Academic Use)
POST

/api/evaluation/evaluate
Used for:
Answer improvement
Learning feedback
Educational evaluation

🧠 Gemini Prompt Engineering Strategy (Design-Level)
Why Prompt Engineering?
Instead of one generic prompt, the system uses intent-driven prompting.
Prompt Logic (Conceptual)
If input is factual:
 → Return a direct answer only

If input is conceptual:
 → Explain clearly
 → Generate learning questions

If input is educational:
 → Explanation 

This prevents:
Repetitive responses
Irrelevant explanations
Overgeneration

🤖 Why a Mock AI Engine?
This is INTENTIONAL.

The project uses a Mock Gemini Engine to:

✅ Ensure predictable evaluation
✅ Avoid API quota & billing issues
✅ Prevent latency & failure during judging
✅ Demonstrate architecture, not dependency🔐 API Key Disclaimer (Mandatory)

⚠️ IMPORTANT
API keys are NOT included
.env is ignored via .gitignore
Keys must be stored securely

Example:

GEMINI_API_KEY=your_api_key_here

The repository is safe and compliant.

▶️ How to Run Locally
Backend
cd backend
npm install
node server.js

Frontend
Open directly:
frontend/index.html
(No build tools required)
