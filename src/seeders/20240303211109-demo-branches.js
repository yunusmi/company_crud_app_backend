'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'branches',
      [
        { branch_id: 1, branch_name: 'Магазин посуды' },
        { branch_id: 2, branch_name: 'Магазин "Овощная"' },
        { branch_id: 3, branch_name: 'Магазин "Винная & Сладости"' },
        { branch_id: 4, branch_name: 'Магазин "Уют для дома"' },
        { branch_id: 5, branch_name: 'Магазин "Фруктовый сад"' },
        { branch_id: 6, branch_name: 'Магазин одежды' },
        { branch_id: 7, branch_name: 'Головной офис' },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('branches', null, {});
  },
};
