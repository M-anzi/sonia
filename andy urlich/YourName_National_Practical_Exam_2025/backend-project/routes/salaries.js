const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Insert salary
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { employeeNumber, GlossSalary, TotalDeduction, NetSalary, month } = req.body;
    
    const query = `
      INSERT INTO salaries (employeeNumber, GlossSalary, TotalDeduction, NetSalary, month)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await pool.execute(query, [employeeNumber, GlossSalary, TotalDeduction, NetSalary, month]);
    
    res.status(201).json({ message: 'Salary created successfully' });
  } catch (error) {
    console.error('Error creating salary:', error);
    res.status(500).json({ message: 'Error creating salary', error: error.message });
  }
});

// Get all salaries (with employee details)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const query = `
      SELECT s.salaryId, s.employeeNumber, e.FirstName, e.LastName, e.Position, d.DepartementName,
             s.GlossSalary, s.TotalDeduction, s.NetSalary, s.month
      FROM salaries s
      JOIN employees e ON s.employeeNumber = e.employeeNumber
      JOIN departments d ON e.DepartementCode = d.DepartementCode
      ORDER BY s.salaryId DESC
    `;
    
    const [rows] = await pool.execute(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching salaries:', error);
    res.status(500).json({ message: 'Error fetching salaries' });
  }
});

// Get single salary by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT s.salaryId, s.employeeNumber, e.FirstName, e.LastName, e.Position, d.DepartementName,
             s.GlossSalary, s.TotalDeduction, s.NetSalary, s.month
      FROM salaries s
      JOIN employees e ON s.employeeNumber = e.employeeNumber
      JOIN departments d ON e.DepartementCode = d.DepartementCode
      WHERE s.salaryId = ?
    `;
    
    const [rows] = await pool.execute(query, [id]);
    
    if (rows.length === 0) {
      res.status(404).json({ message: 'Salary not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching salary:', error);
    res.status(500).json({ message: 'Error fetching salary' });
  }
});

// Update salary
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { GlossSalary, TotalDeduction, NetSalary, month } = req.body;
    
    const query = `
      UPDATE salaries
      SET GlossSalary = ?, TotalDeduction = ?, NetSalary = ?, month = ?
      WHERE salaryId = ?
    `;
    
    await pool.execute(query, [GlossSalary, TotalDeduction, NetSalary, month, id]);
    
    res.json({ message: 'Salary updated successfully' });
  } catch (error) {
    console.error('Error updating salary:', error);
    res.status(500).json({ message: 'Error updating salary', error: error.message });
  }
});

// Delete salary
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('DELETE FROM salaries WHERE salaryId = ?', [id]);
    
    res.json({ message: 'Salary deleted successfully' });
  } catch (error) {
    console.error('Error deleting salary:', error);
    res.status(500).json({ message: 'Error deleting salary', error: error.message });
  }
});

module.exports = router;
