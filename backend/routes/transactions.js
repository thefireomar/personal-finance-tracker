const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const pool = req.app.locals.pool;
  const { userId, amount, type, category, description } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO transactions (user_id, amount, type, category, description, date) VALUES (?, ?, ?, ?, ?, NOW())',
      [userId, amount, type, category, description]
    );
    
    const [transaction] = await pool.query(
      'SELECT * FROM transactions WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(transaction[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  const pool = req.app.locals.pool;
  try {
    const [transactions] = await pool.query(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC',
      [req.params.userId]
    );
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const pool = req.app.locals.pool;
  const { amount, type, category, description } = req.body;

  try {
    await pool.query(
      'UPDATE transactions SET amount = ?, type = ?, category = ?, description = ? WHERE id = ?',
      [amount, type, category, description, req.params.id]
    );
    
    const [transaction] = await pool.query(
      'SELECT * FROM transactions WHERE id = ?',
      [req.params.id]
    );
    
    res.json(transaction[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const pool = req.app.locals.pool;
  try {
    await pool.query('DELETE FROM transactions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
