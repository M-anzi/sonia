const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Insert employee (only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartementCode } = req.body;
    
    const query = `
      INSERT INTO employees (employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartementCode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.execute(query, [employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartementCode]);
    
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
});

// Get all employees (for dropdown in salary form)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT employeeNumber, FirstName, LastName, Position, DepartementCode FROM employees');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

module.exports = router;
