const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');

// 🔥 Detection patterns
const patterns = {
  url: /(https?:\/\/[^\s]+)/gi,
  email: /\S+@\S+\.\S+/,
  phone: /\b\d{10}\b/,
  suspiciousWords: /(loan|win|free|offer|click|urgent|otp|prize|money|fraud|scam|fake|hack|phishing)/gi
};

// 🔍 SCAN ROUTE
router.post('/scan', async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: 'No input provided' });
  }

  let score = 0;
  let flags = [];
  let type = 'Unknown';

  const lower = data.toLowerCase();

  // URL
  if (patterns.url.test(lower)) {
    score += 30;
    flags.push('URL detected');
    type = 'Phishing';
  }

  // Phone
  if (patterns.phone.test(lower)) {
    score += 15;
    flags.push('Phone detected');
    type = 'Call/SMS Scam';
  }

  // Email
  if (patterns.email.test(lower)) {
    score += 10;
    flags.push('Email detected');
  }

  // Suspicious words
  const words = lower.match(patterns.suspiciousWords);
  if (words) {
    score += words.length * 15;
    flags.push(`Suspicious: ${words.join(', ')}`);
  }

  // Strong trigger
  if (lower.includes('fraud') || lower.includes('scam')) {
    score += 40;
    flags.push('High-risk keyword detected');
    type = 'Scam Alert';
  }

  if (score > 100) score = 100;

  const status =
    score >= 70 ? 'fraud' : score >= 30 ? 'warning' : 'safe';

  // 🔥 Crowd intelligence
  let existing = await Scan.findOne({ input: data });

  if (existing) {
    existing.count += 1;
    await existing.save();
  } else {
    existing = new Scan({
      input: data,
      status,
      score,
      type,
      count: 1
    });
    await existing.save();
  }

  // Advice
  let advice = [];

  if (status === 'fraud') {
    advice = [
      'Do NOT click links',
      'Do NOT share OTP',
      'Block/report sender immediately'
    ];
  } else if (status === 'warning') {
    advice = ['Be cautious', 'Verify before trusting'];
  } else {
    advice = ['Looks safe'];
  }

  res.json({
    status,
    score,
    flags,
    type,
    advice,
    reports: existing.count
  });
});

// 📊 GET SCANS
router.get('/scans', async (req, res) => {
  try {
    const scans = await Scan.find().sort({ createdAt: -1 });
    res.json(scans);
  } catch {
    res.status(500).json({ message: 'Error fetching scans' });
  }
});

module.exports = router;