import { pool } from '../config/database.js';

export class BranchModel {
  createBranch = (branchData) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO Branches (branch_name) VALUES (?)";
      const values = [branchData.branch_name];
      pool.execute(query, values, (err, result) => {
        if (err) {
          console.error('Ошибка при создании филиала:', err);
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  };

  getAllBranches = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Branches";
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

  getBranchById = (branchId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Branches WHERE branch_id = ?";
      pool.execute(query, [branchId], (err, result) => {
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

  updateBranchById = (branchId, newBranchData) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE Branches SET branch_name = ? WHERE branch_id = ?";
      const values = [newBranchData.branch_name, branchId];
      pool.execute(query, values, (err, result) => {
        if (err) {
          console.error('Ошибка при обновлении филиала:', err);
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  };

  deleteBranchById = (branchId) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Branches WHERE branch_id = ?";
      pool.execute(query, [branchId], (err, result) => {
        if (err) {
          console.error('Ошибка при удалении филиала:', err);
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  };
}