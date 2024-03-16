'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'branches',
      [
        { branch_name: 'Магазин посуды' },
        { branch_name: 'Магазин "Овощная"' },
        { branch_name: 'Магазин "Винная & Сладости"' },
        { branch_name: 'Магазин "Уют для дома"' },
        { branch_name: 'Магазин "Фруктовый сад"' },
        { branch_name: 'Магазин одежды' },
        { branch_name: 'Головной офис' },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('branches', null, {});
  },
};
