'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'branches',
      {
        branch_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        branch_name: {
          type: Sequelize.STRING(50),
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('branches');
  },
};
