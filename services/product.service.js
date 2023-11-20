import { pool } from '../config/database.js';

export class ProductModel {
  createProduct = (productData, quantityInStock) => {
    return new Promise((resolve, reject) => {
      pool.execute("INSERT INTO Products (product_name, price, branch_id) VALUES (?, ?, ?)", 
      [productData.product_name, productData.price, productData.branch_id], 
      (err, result) => {
        if (err) {
          console.error('Ошибка при создании товара:', err);
          reject(err);
        } else {
          const productId = result.insertId;
          pool.execute("INSERT INTO Inventory (product_id, quantity_in_stock) VALUES (?, ?)", 
          [productId, productData.quantity_in_stock], 
          (err, result) => {
            if (err) {
              console.error('Ошибка при создании записи в инвентаре:', err);
              reject(err);
            } else {
              resolve(productId);
            }
          });
        }
      });
    });
  };

  getAllProducts = () => {
    return new Promise((resolve, reject) => {
      pool.execute("SELECT * FROM Products", (err, result) => {
        if (err) {
          console.error('Ошибка при выполнении запроса:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  getProductById = (productId) => {
    return new Promise((resolve, reject) => {
      pool.execute("SELECT * FROM Products WHERE product_id = ?", [productId], (err, result) => {
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

  getProductsByBranchId = (branchId) => {
    return new Promise((resolve, reject) => {
      pool.execute("SELECT * FROM Products WHERE branch_id = ?", [branchId], (err, result) => {
        if (err) {
          console.error('Ошибка при выполнении запроса:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  updateProductById = (productId, newProductData) => {
    return new Promise((resolve, reject) => {
      pool.execute("UPDATE Products SET product_name = ?, price = ?, branch_id = ? WHERE product_id = ?", 
      [newProductData.product_name, newProductData.price, newProductData.branch_id, productId], 
      (err, result) => {
        if (err) {
          console.error('Ошибка при обновлении товара:', err);
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  };

  deleteProductById = (productId) => {
    return new Promise((resolve, reject) => {
      pool.execute("DELETE FROM Products WHERE product_id = ?", [productId], (err, result) => {
        if (err) {
          console.error('Ошибка при удалении товара:', err);
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  };
}