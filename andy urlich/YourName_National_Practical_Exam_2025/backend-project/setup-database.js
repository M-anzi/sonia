const mysql = require('mysql2/promise');

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
  });

  try {
    console.log('Creating database...');
    await connection.execute('CREATE DATABASE IF NOT EXISTS epms');
    await connection.execute('USE epms');

    console.log('Creating departments table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS departments (
        DepartementCode VARCHAR(10) PRIMARY KEY,
        DepartementName VARCHAR(100) NOT NULL,
        GrossSalary DECIMAL(15,2) NOT NULL
      )
    `);

    console.log('Creating employees table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS employees (
        employeeNumber INT PRIMARY KEY,
        FirstName VARCHAR(50) NOT NULL,
        LastName VARCHAR(50) NOT NULL,
        Position VARCHAR(50) NOT NULL,
        Address VARCHAR(200),
        Telephone VARCHAR(20),
        Gender VARCHAR(10),
        hiredDate DATE,
        DepartementCode VARCHAR(10),
        FOREIGN KEY (DepartementCode) REFERENCES departments(DepartementCode)
      )
    `);

    console.log('Creating salaries table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS salaries (
        salaryId INT AUTO_INCREMENT PRIMARY KEY,
        employeeNumber INT NOT NULL,
        GlossSalary DECIMAL(15,2) NOT NULL,
        TotalDeduction DECIMAL(15,2) NOT NULL,
        NetSalary DECIMAL(15,2) NOT NULL,
        month VARCHAR(20) NOT NULL,
        FOREIGN KEY (employeeNumber) REFERENCES employees(employeeNumber)
      )
    `);

    console.log('Inserting sample department data...');
    await connection.execute(`
      INSERT IGNORE INTO departments (DepartementCode, DepartementName, GrossSalary) VALUES
      ('CW', 'Carwash', 300000),
      ('ST', 'Stock', 200000),
      ('MC', 'Mechanic', 450000),
      ('ADMS', 'Administration Staff', 600000)
    `);

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await connection.end();
  }
}

setupDatabase();
