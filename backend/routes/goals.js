const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const pool = req.app.locals.pool;
  const { userId, name, targetAmount, category, deadline } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO goals (user_id, name, target_amount, category, deadline) VALUES (?, ?, ?, ?, ?)',
      [userId, name, targetAmount, category, deadline]
    );
    
    const [goal] = await pool.query('SELECT * FROM goals WHERE id = ?', [result.insertId]);
    res.status(201).json(goal[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  const pool = req.app.locals.pool;
  try {
    const [goals] = await pool.query(
      'SELECT * FROM goals WHERE user_id = ? ORDER BY deadline ASC',
      [req.params.userId]
    );
    res.json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id/progress', async (req, res) => {
  const pool = req.app.locals.pool;
  const { currentAmount } = req.body;

  try {
    await pool.query(
      'UPDATE goals SET current_amount = ? WHERE id = ?',
      [currentAmount, req.params.id]
    );
    
    const [goal] = await pool.query('SELECT * FROM goals WHERE id = ?', [req.params.id]);
    res.json(goal[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const pool = req.app.locals.pool;
  try {
    await pool.query('DELETE FROM goals WHERE id = ?', [req.params.id]);
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
