const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pool = require('./config/database');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'epms-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/salaries', require('./routes/salaries'));
app.use('/api/reports', require('./routes/reports'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'EPMS Backend API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
