const fraudKeywords = [
  "urgent",
  "otp",
  "password",
  "bank",
  "click here",
  "win",
  "lottery",
  "free",
  "blocked",
  "verify",
  "limited",
  "prize",
  "claim",
  "link",
  "http",
  "https",
  "suspended",
  "offer"
];

const scamPatterns = [
  /win.*money/i,
  /urgent.*action/i,
  /verify.*account/i,
  /click.*link/i,
  /free.*offer/i,
  /bank.*block/i,
  /otp.*share/i,
  /account.*suspend/i,
  /click here/i
];

function detectFraud(text) {
  let score = 0;
  let foundKeywords = [];

  const lowerText = text.toLowerCase();

  // 🔥 STRONGER KEYWORD SCORING
  fraudKeywords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 10;
      foundKeywords.push(word);
    }
  });

  // 🔥 STRONGER PATTERN SCORING
  scamPatterns.forEach(pattern => {
    if (pattern.test(text)) {
      score += 25;
    }
  });

  // Cap score
  if (score > 100) score = 100;

  let verdict = "SAFE";
  if (score >= 70) verdict = "HIGH RISK";
  else if (score >= 40) verdict = "SUSPICIOUS";

  return {
    score,
    verdict,
    keywords: foundKeywords
  };
}

module.exports = detectFraud;