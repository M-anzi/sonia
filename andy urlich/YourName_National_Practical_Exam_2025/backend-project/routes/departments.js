const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Insert department (only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { DepartementCode, DepartementName, GrossSalary } = req.body;
    
    const query = `
      INSERT INTO departments (DepartementCode, DepartementName, GrossSalary)
      VALUES (?, ?, ?)
    `;
    
    await pool.execute(query, [DepartementCode, DepartementName, GrossSalary]);
    
    res.status(201).json({ message: 'Department created successfully' });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
});

// Get all departments (for dropdown in employee form)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT DepartementCode, DepartementName, GrossSalary FROM departments');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

module.exports = router;
