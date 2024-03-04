'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          product_id: 50,
          product_name: 'Полотенце для кухни',
          price: 250.0,
          branch_id: 1,
        },
        { product_id: 51, product_name: 'Чайник', price: 500.0, branch_id: 1 },
        {
          product_id: 52,
          product_name: 'Чашки (5 шт./упаковка)',
          price: 2500.0,
          branch_id: 1,
        },
        {
          product_id: 54,
          product_name: 'Ножи (5 шт./кор)',
          price: 1000.0,
          branch_id: 1,
        },
        {
          product_id: 55,
          product_name: 'Вилки (5 шт./кор)',
          price: 1000.0,
          branch_id: 1,
        },
        {
          product_id: 56,
          product_name: 'Тарелки (10 шт./упаковка)',
          price: 2000.0,
          branch_id: 1,
        },
        { product_id: 57, product_name: 'Мангал', price: 5000.0, branch_id: 1 },
        {
          product_id: 58,
          product_name: 'Огурцы (1 кг.)',
          price: 200.0,
          branch_id: 2,
        },
        {
          product_id: 59,
          product_name: 'Помидоры (1 кг.)',
          price: 250.0,
          branch_id: 2,
        },
        {
          product_id: 60,
          product_name: 'Грибы (500 гр.)',
          price: 500.0,
          branch_id: 2,
        },
        {
          product_id: 61,
          product_name: 'Болгарский перец (1 кг.)',
          price: 150.0,
          branch_id: 2,
        },
        { product_id: 62, product_name: 'Шоколад', price: 500.0, branch_id: 3 },
        { product_id: 63, product_name: 'Печенье', price: 200.0, branch_id: 3 },
        {
          product_id: 64,
          product_name: 'Энергетические батончики',
          price: 300.0,
          branch_id: 3,
        },
        {
          product_id: 65,
          product_name: 'Сникерсы',
          price: 600.0,
          branch_id: 3,
        },
        {
          product_id: 66,
          product_name: 'шоколад марки "Белисимо"',
          price: 1200.0,
          branch_id: 3,
        },
        {
          product_id: 67,
          product_name: 'Французское вино (0,5 л.)',
          price: 750.0,
          branch_id: 3,
        },
        {
          product_id: 68,
          product_name: 'Стол для кухни',
          price: 5000.0,
          branch_id: 4,
        },
        { product_id: 69, product_name: 'Диван', price: 2000.0, branch_id: 4 },
        {
          product_id: 70,
          product_name: 'Мебель для дома',
          price: 10000.0,
          branch_id: 4,
        },
        {
          product_id: 71,
          product_name: 'Матрас для спальни',
          price: 1500.0,
          branch_id: 4,
        },
        {
          product_id: 72,
          product_name: 'Апельсиновый сок (1 л.)',
          price: 500.0,
          branch_id: 5,
        },
        {
          product_id: 73,
          product_name: 'Сок марки "Добрый" яблочный',
          price: 500.0,
          branch_id: 5,
        },
        {
          product_id: 74,
          product_name: 'Сок марки "Добрый" кокосовый',
          price: 550.0,
          branch_id: 5,
        },
        {
          product_id: 75,
          product_name: 'Сок марки "Добрый" мультифрукт',
          price: 600.0,
          branch_id: 5,
        },
        {
          product_id: 76,
          product_name: 'Ананасовый сок (микс) 1 уп.',
          price: 350.0,
          branch_id: 5,
        },
        { product_id: 77, product_name: 'Майка', price: 500.0, branch_id: 12 },
        {
          product_id: 78,
          product_name: 'Спортивки (коллекция)',
          price: 3000.0,
          branch_id: 12,
        },
        {
          product_id: 79,
          product_name: 'Худи (мерч бренда)',
          price: 5000.0,
          branch_id: 12,
        },
        { product_id: 80, product_name: 'Кепка', price: 200.0, branch_id: 12 },
        { product_id: 81, product_name: 'Одеяло', price: 500.0, branch_id: 4 },
        {
          product_id: 82,
          product_name: 'Кружка стеклянная',
          price: 150.0,
          branch_id: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
