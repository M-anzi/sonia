const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Generate monthly payroll report
router.get('/monthly-payroll', authMiddleware, async (req, res) => {
  try {
    const { month } = req.query;
    
    let query = `
      SELECT e.FirstName, e.LastName, e.Position, d.DepartementName as Department, s.NetSalary
      FROM salaries s
      JOIN employees e ON s.employeeNumber = e.employeeNumber
      JOIN departments d ON e.DepartementCode = d.DepartementCode
    `;
    
    const params = [];
    
    if (month) {
      query += ' WHERE s.month = ?';
      params.push(month);
    }
    
    query += ' ORDER BY d.DepartementName, e.LastName';
    
    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error generating monthly payroll report:', error);
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
});

module.exports = router;
