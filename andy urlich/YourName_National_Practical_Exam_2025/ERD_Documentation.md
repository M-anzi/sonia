# ERD Documentation - Employee Payroll Management System (EPMS)

## Entity Relationship Diagram

### Entities and Relationships

```
Department (1) ----< (N) Employee (1) ----< (N) Salary
```

### Entity Details

#### Department
- **Primary Key**: DepartementCode
- **Attributes**:
  - DepartementCode (PK) - VARCHAR(10)
  - DepartementName - VARCHAR(100)
  - GrossSalary - DECIMAL(15,2)

#### Employee
- **Primary Key**: employeeNumber
- **Foreign Key**: DepartementCode (references Department)
- **Attributes**:
  - employeeNumber (PK) - INT
  - FirstName - VARCHAR(50)
  - LastName - VARCHAR(50)
  - Position - VARCHAR(50)
  - Address - VARCHAR(200)
  - Telephone - VARCHAR(20)
  - Gender - VARCHAR(10)
  - hiredDate - DATE
  - DepartementCode (FK) - VARCHAR(10)

#### Salary
- **Primary Key**: salaryId (auto-increment)
- **Foreign Key**: employeeNumber (references Employee)
- **Attributes**:
  - salaryId (PK) - INT AUTO_INCREMENT
  - employeeNumber (FK) - INT
  - GlossSalary - DECIMAL(15,2)
  - TotalDeduction - DECIMAL(15,2)
  - NetSalary - DECIMAL(15,2)
  - month - VARCHAR(20)

### Cardinalities
- **Department to Employee**: One-to-Many (1:N)
  - One department can have many employees
  - Each employee belongs to one department
  
- **Employee to Salary**: One-to-Many (1:N)
  - One employee can have multiple salary records (monthly)
  - Each salary record belongs to one employee

### Sample Department Data

| DepartementCode | DepartementName | GrossSalary | Total Deduction |
|----------------|-----------------|-------------|-----------------|
| CW | Carwash | 300,000 RWF | 20,000 RWF |
| ST | Stock | 200,000 RWF | 5,000 RWF |
| MC | Mechanic | 450,000 RWF | 40,000 RWF |
| ADMS | Administration Staff | 600,000 RWF | 70,000 RWF |

### ERD Symbols
- **(1)**: One side of relationship
- **< (N)**: Many side of relationship
- **PK**: Primary Key
- **FK**: Foreign Key

### Notes
- Draw this ERD on plain paper using pencils before implementation
- Ensure correct cardinality symbols are used
- Label all relationships clearly
- Include all attributes for each entity
