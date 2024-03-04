import { pool } from '../config/database.js';

export class SalesService {
  createSale = (saleData) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'INSERT INTO Sales (product_id, employee_id, sale_date, quantity) VALUES (?, ?, ?, ?)',
        [
          saleData.product_id,
          saleData.employee_id,
          saleData.sale_date,
          saleData.quantity,
        ],
        (err, result) => {
          if (err) {
            console.error('Ошибка при создании продажи:', err);
            reject(err);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  };

  getAllSales = () => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'SELECT * FROM Sales ORDER BY sale_id DESC',
        (err, result) => {
          if (err) {
            console.error('Ошибка при выполнении запроса:', err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  getSaleById = (saleId) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'SELECT * FROM Sales WHERE sale_id = ?',
        [saleId],
        (err, result) => {
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
        }
      );
    });
  };

  updateSaleById = (saleId, newSaleData) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'UPDATE Sales SET product_id = ?, employee_id = ?, sale_date = ?, quantity = ? WHERE sale_id = ?',
        [
          newSaleData.product_id,
          newSaleData.employee_id,
          newSaleData.sale_date,
          newSaleData.quantity,
          saleId,
        ],
        async (err, result) => {
          if (err) {
            console.error('Ошибка при обновлении продажи:', err);
            reject(err);
          } else {
            try {
              await this.updateInventory(
                newSaleData.product_id,
                -newSaleData.quantity
              );
              resolve(result.affectedRows);
            } catch (error) {
              console.error('Ошибка при обновлении инвентаря:', error);
              reject(error);
            }
          }
        }
      );
    });
  };

  updateInventory = (product_id, quantity) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'UPDATE Inventory SET quantity_in_stock = quantity_in_stock + ? WHERE product_id = ?',
        [quantity, product_id],
        (err, result) => {
          if (err) {
            console.error('Ошибка при обновлении инвентаря:', err);
            reject(err);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  };

  deleteSaleById = (saleId) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'DELETE FROM Sales WHERE sale_id = ?',
        [saleId],
        (err, result) => {
          if (err) {
            console.error('Ошибка при удалении продажи:', err);
            reject(err);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  };
}
