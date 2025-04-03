const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw new Error('MongoDB connection failed');
  }
};

const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (password.length < minLength) return 'Password must be at least 8 characters long';
  if (!hasNumber) return 'Password must contain at least one number';
  if (!hasLetter) return 'Password must contain at least one letter';
  if (!hasSpecial) return 'Password must contain at least one special character';
  return null;
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    const { username, email, password } = req.body;

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (existingUser) {
      const field = existingUser.email === email.toLowerCase() ? 'email' : 'username';
      return res.status(400).json({
        error: `This ${field} is already registered`
      });
    }

    // Create user
    const salt = await bcrypt.genSalt(10);
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, salt)
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors[0] });
    }
    
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};
