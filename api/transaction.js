const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

module.exports = async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: 'Transaction deleted' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
};
