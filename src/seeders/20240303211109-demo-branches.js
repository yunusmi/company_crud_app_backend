'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'branches',
      [
        { branch_name: 'Филиал 1' },
        { branch_name: 'Филиал 2' },
        { branch_name: 'Филиал 3' },
        { branch_name: 'Филиал 4' },
        { branch_name: 'Филиал 5' },
        { branch_name: 'Филиал 6' },
        { branch_name: 'Филиал 7' },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('branches', null, {});
  },
};
