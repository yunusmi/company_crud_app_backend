'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'products',
      {
        product_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        product_name: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
        },
        branch_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
