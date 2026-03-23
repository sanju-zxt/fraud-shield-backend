const express = require("express");
const cors = require("cors");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ TEMP STORAGE (in-memory)
let reports = [];

// ✅ ROOT (for testing Render)
app.get("/", (req, res) => {
  res.send("Fraud Shield Backend Running 🚀");
});

// ✅ GET ALL REPORTS
app.get("/api/reports", (req, res) => {
  res.json(reports);
});

// ✅ ADD REPORT
app.post("/api/reports", (req, res) => {
  try {
    const { title, description, type, risk, score } = req.body;

    // basic validation
    if (!title || !description) {
      return res.status(400).json({
        error: "Title and description required",
      });
    }

    const newReport = {
      id: reports.length + 1,
      title,
      description,
      type: type || "Unknown",
      risk: risk || "LOW",
      score: score || 0,
      createdAt: new Date(),
    };

    reports.push(newReport);

    res.status(201).json(newReport);
  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE (optional but useful)
app.delete("/api/reports/:id", (req, res) => {
  const id = parseInt(req.params.id);

  reports = reports.filter((r) => r.id !== id);

  res.json({ message: "Deleted successfully" });
});

// ✅ PORT (VERY IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});