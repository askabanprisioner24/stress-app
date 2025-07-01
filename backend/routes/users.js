const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, phone, emergencyContactName, emergencyContactNumber, counsellorName, counsellorContactNumber, password } = req.body;
    if (!fullName || !email || !phone || !emergencyContactName || !emergencyContactNumber || !counsellorName || !counsellorContactNumber || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered.' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      phone,
      emergencyContactName,
      emergencyContactNumber,
      counsellorName,
      counsellorContactNumber,
      password: hashed,
    });
    await user.save();
    res.status(201).json({ message: 'Signup successful.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { fullName: user.fullName, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
