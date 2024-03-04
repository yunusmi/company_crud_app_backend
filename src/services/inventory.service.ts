import { pool } from '../config/database.js';

export class InventoryService {
  createInventoryItem = (product_id, quantity_in_stock) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO Inventory (product_id, quantity_in_stock) VALUES (?, ?)';
      const values = [product_id, quantity_in_stock];
      pool.execute(query, values, (err, result) => {
        if (err) {
          console.error('Ошибка при создании записи инвентаря:', err);
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  };

  getAllInventoryItems = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Inventory';
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

  getInventoryItemById = (inventoryId) => {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT * FROM Inventory WHERE product_id = ? AND quantity_in_stock > 0';
      pool.execute(query, [inventoryId], (err, result) => {
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

  updateInventoryItemById = (inventoryId, newQuantity) => {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE Inventory SET quantity_in_stock = ? WHERE inventory_id = ?';
      const values = [newQuantity, inventoryId];
      pool.execute(query, values, (err, result) => {
        if (err) {
          console.error('Ошибка при обновлении записи инвентаря:', err);
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  };

  deleteInventoryItemById = (inventoryId) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Inventory WHERE inventory_id = ?';
      pool.execute(query, [inventoryId], (err, result) => {
        if (err) {
          console.error('Ошибка при удалении записи инвентаря:', err);
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  };
}
