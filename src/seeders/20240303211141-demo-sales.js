'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'sales',
      [
        {
          sale_id: 23,
          product_id: 60,
          employee_id: 55,
          sale_date: '2023-10-22',
          quantity: 50,
        },
        {
          sale_id: 24,
          product_id: 50,
          employee_id: 24,
          sale_date: '2023-02-20',
          quantity: 20,
        },
        {
          sale_id: 25,
          product_id: 56,
          employee_id: 25,
          sale_date: '2020-02-22',
          quantity: 35,
        },
        {
          sale_id: 26,
          product_id: 67,
          employee_id: 35,
          sale_date: '2023-10-12',
          quantity: 50,
        },
        {
          sale_id: 27,
          product_id: 66,
          employee_id: 45,
          sale_date: '2023-11-04',
          quantity: 15,
        },
        {
          sale_id: 28,
          product_id: 78,
          employee_id: 55,
          sale_date: '2023-09-25',
          quantity: 5,
        },
        {
          sale_id: 29,
          product_id: 82,
          employee_id: 64,
          sale_date: '2023-10-23',
          quantity: 4,
        },
        {
          sale_id: 30,
          product_id: 60,
          employee_id: 27,
          sale_date: '2023-10-27',
          quantity: 100,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
