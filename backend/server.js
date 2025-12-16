require("dotenv").config();
const express = require("express");
const cors = require("cors");

const documentRoutes = require("./routes/document.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/document", documentRoutes);

app.listen(8080, () => {
  console.log("🚀 Server listening on port 8080");
});
