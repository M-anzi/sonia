const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Hardcoded user for demo (in production, store in database)
const users = [
  { username: 'admin', password: bcrypt.hashSync('admin', 10) }
];

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username);
  
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.username;
    res.json({ message: 'Login successful', username: user.username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
});

router.get('/check', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ authenticated: true, username: req.session.userId });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
