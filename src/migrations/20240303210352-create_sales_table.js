'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'sales',
      {
        sale_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        employee_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        sale_date: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        quantity: {
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
    await queryInterface.dropTable('sales');
  },
};
