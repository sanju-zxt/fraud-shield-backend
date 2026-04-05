require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch((err) => console.error('DB Error:', err));

// 🔥 Routes
const scanRoutes = require('./routes/scanRoutes');
app.use('/api', scanRoutes);

// 🔥 Root route
app.get('/', (req, res) => {
  res.send('Fraud Shield API Running 🚀');
});

// 🔥 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});