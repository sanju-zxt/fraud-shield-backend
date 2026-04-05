const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  input: String,
  status: String,
  score: Number,
  type: String,
  count: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', scanSchema);