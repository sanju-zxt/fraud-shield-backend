const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ROOT
app.get("/", (req, res) => {
  res.send("Fraud Shield API Running 🚀");
});

// MODEL
const ReportSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
});

const Report = mongoose.model("Report", ReportSchema);

// GET REPORTS
app.get("/api/reports", async (req, res) => {
  try {
    const data = await Report.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ADD TEST DATA
app.get("/api/reports/test", async (req, res) => {
  const r = await Report.create({
    title: "UPI Fraud",
    description: "Suspicious transaction",
    type: "UPI",
  });
  res.json(r);
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("DB Connected");
  app.listen(5000, () => console.log("Server running"));
});