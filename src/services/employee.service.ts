import { pool } from '../config/database.js';

export class EmployeeService {
  createEmployee = (employeeData) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO Employees (first_name, last_name, branch_id) VALUES (?, ?, ?)';
      const values = [
        employeeData.first_name,
        employeeData.last_name,
        employeeData.branch_id,
      ];
      pool.execute(query, values, (err, result) => {
        if (err) {
          console.error('Ошибка при создании сотрудника:', err);
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  };

  getAllEmployees = () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT Employees.*, Branches.branch_name
        FROM Employees
        JOIN Branches ON Employees.branch_id = Branches.branch_id
      `;
      pool.execute(query, (err, result) => {
        if (err) {
          console.error('Ошибка при выполнении запроса:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  getEmployeeById = (employeeId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Employees WHERE employee_id = ?';
      pool.execute(query, [employeeId], (err, result) => {
        if (err) {
          console.error('Ошибка при выполнении запроса:', err);
          reject(err);
        } else {
          if (result.length === 0) {
            resolve(null);
          } else {
            resolve(result[0]);
          }
        }
      });
    });
  };

  getEmployeesByBranchId = (branchId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Employees WHERE branch_id = ?';
      pool.execute(query, [branchId], (err, result) => {
        if (err) {
          console.error('Ошибка при выполнении запроса:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  updateEmployeeById = (employeeId, newEmployeeData) => {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE Employees SET first_name = ?, last_name = ?, branch_id = ? WHERE employee_id = ?';
      const values = [
        newEmployeeData.first_name,
        newEmployeeData.last_name,
        newEmployeeData.branch_id,
        employeeId,
      ];
      pool.execute(query, values, (err, result) => {
        if (err) {
          console.error('Ошибка при обновлении сотрудника:', err);
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  };

  deleteEmployeeById = (employeeId) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Employees WHERE employee_id = ?';
      pool.execute(query, [employeeId], (err, result) => {
        if (err) {
          console.error('Ошибка при удалении сотрудника:', err);
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  };
}
