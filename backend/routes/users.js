const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const pool = req.app.locals.pool;

  try {
    // Input validation
    if (!username || !email || !password) {
      console.log('Missing required fields:', { username, email, password });
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    console.log('Checking for existing user:', email, username);
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      console.log('User already exists');
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    console.log('Creating new user:', username);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [username, email, hashedPassword]
    );

    console.log('User created successfully:', result.insertId);
    const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET);
    res.status(201).json({ token, userId: result.insertId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const pool = req.app.locals.pool;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
