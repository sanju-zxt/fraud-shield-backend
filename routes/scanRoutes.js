const express = require("express");
const router = express.Router();
const Scan = require("../models/Scan");
const detectFraud = require("../utils/fraudDetector");

// ✅ TEST ROUTE (IMPORTANT DEBUG)
router.get("/test", (req, res) => {
  res.json({ message: "Scan route working ✅" });
});

// ✅ POST: Scan text
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required"
      });
    }

    const result = detectFraud(text);

    const newScan = new Scan({
      text,
      result: result.verdict,
      score: result.score,
      keywords: result.keywords
    });

    await newScan.save();

    res.json({
      success: true,
      score: result.score,
      verdict: result.verdict,
      keywords: result.keywords
    });

  } catch (error) {
    console.error("Scan Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ✅ GET: History
router.get("/history", async (req, res) => {
  try {
    const history = await Scan.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: history
    });

  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;