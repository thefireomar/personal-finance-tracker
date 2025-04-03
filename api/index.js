const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const transactions = await Transaction.find().sort({ date: -1 });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
