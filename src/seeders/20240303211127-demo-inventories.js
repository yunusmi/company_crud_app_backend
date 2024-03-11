'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'inventories',
      [
        { inventory_id: 38, product_id: 50, quantity_in_stock: 180 },
        { inventory_id: 39, product_id: 51, quantity_in_stock: 200 },
        { inventory_id: 40, product_id: 52, quantity_in_stock: 200 },
        { inventory_id: 41, product_id: 53, quantity_in_stock: 500 },
        { inventory_id: 42, product_id: 54, quantity_in_stock: 300 },
        { inventory_id: 43, product_id: 55, quantity_in_stock: 100 },
        { inventory_id: 44, product_id: 56, quantity_in_stock: 180 },
        { inventory_id: 45, product_id: 57, quantity_in_stock: 5 },
        { inventory_id: 46, product_id: 58, quantity_in_stock: 500 },
        { inventory_id: 47, product_id: 59, quantity_in_stock: 100 },
        { inventory_id: 48, product_id: 60, quantity_in_stock: 150 },
        { inventory_id: 49, product_id: 61, quantity_in_stock: 400 },
        { inventory_id: 50, product_id: 62, quantity_in_stock: 200 },
        { inventory_id: 51, product_id: 63, quantity_in_stock: 500 },
        { inventory_id: 52, product_id: 64, quantity_in_stock: 400 },
        { inventory_id: 53, product_id: 65, quantity_in_stock: 500 },
        { inventory_id: 54, product_id: 66, quantity_in_stock: 170 },
        { inventory_id: 55, product_id: 67, quantity_in_stock: 150 },
        { inventory_id: 56, product_id: 68, quantity_in_stock: 50 },
        { inventory_id: 57, product_id: 69, quantity_in_stock: 5 },
        { inventory_id: 58, product_id: 70, quantity_in_stock: 5 },
        { inventory_id: 59, product_id: 71, quantity_in_stock: 50 },
        { inventory_id: 60, product_id: 72, quantity_in_stock: 200 },
        { inventory_id: 61, product_id: 73, quantity_in_stock: 500 },
        { inventory_id: 62, product_id: 74, quantity_in_stock: 400 },
        { inventory_id: 63, product_id: 75, quantity_in_stock: 900 },
        { inventory_id: 64, product_id: 76, quantity_in_stock: 600 },
        { inventory_id: 65, product_id: 77, quantity_in_stock: 50 },
        { inventory_id: 66, product_id: 78, quantity_in_stock: 45 },
        { inventory_id: 67, product_id: 79, quantity_in_stock: 20 },
        { inventory_id: 68, product_id: 80, quantity_in_stock: 500 },
        { inventory_id: 69, product_id: 81, quantity_in_stock: 20 },
        { inventory_id: 70, product_id: 82, quantity_in_stock: 6 },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inventories', null, {});
  },
};
