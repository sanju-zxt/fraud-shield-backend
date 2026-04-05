const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors());

// Middleware
app.use(express.json());

// Routes
const scanRoutes = require("./routes/scanRoutes");
app.use("/api/scan", scanRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Fraud Shield API Running 🚀");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.log("DB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});