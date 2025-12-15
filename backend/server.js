require("dotenv").config(); // 🔑 load .env first

const express = require("express");
const cors = require("cors");

const app = express();

console.log("🔥 server.js started");

app.use(cors());
app.use(express.json());

// Routes
const documentRoutes = require("./routes/document.routes");
const evaluationRoutes = require("./routes/evaluation.routes");

console.log("🔥 Mounting /api/document routes");
app.use("/api/document", documentRoutes);

console.log("🔥 Mounting /api/evaluation routes");
app.use("/api/evaluation", evaluationRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
