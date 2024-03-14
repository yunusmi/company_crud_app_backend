'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'employees',
      [
        {
          employee_id: 24,
          first_name: 'Вероника',
          last_name: 'Стасчук',
          branch_id: 1,
        },
        {
          employee_id: 25,
          first_name: 'Влада',
          last_name: 'Кириенко',
          branch_id: 1,
        },
        {
          employee_id: 27,
          first_name: 'Юнус',
          last_name: 'Ашыров',
          branch_id: 5,
        },
        {
          employee_id: 28,
          first_name: 'Марина',
          last_name: 'Светлакова',
          branch_id: 1,
        },
        {
          employee_id: 29,
          first_name: 'Алина',
          last_name: 'Светлакова',
          branch_id: 1,
        },
        {
          employee_id: 30,
          first_name: 'Сергей',
          last_name: 'Алексеев',
          branch_id: 1,
        },
        {
          employee_id: 31,
          first_name: 'Александра',
          last_name: 'Минина',
          branch_id: 2,
        },
        {
          employee_id: 32,
          first_name: 'Тельман',
          last_name: 'Гасанов',
          branch_id: 2,
        },
        {
          employee_id: 33,
          first_name: 'Диана',
          last_name: 'Сергеенко',
          branch_id: 2,
        },
        {
          employee_id: 34,
          first_name: 'Екатерина',
          last_name: 'Мельникова',
          branch_id: 2,
        },
        {
          employee_id: 35,
          first_name: 'Илона',
          last_name: 'Минаева',
          branch_id: 3,
        },
        {
          employee_id: 36,
          first_name: 'Анна',
          last_name: 'Ткаченко',
          branch_id: 3,
        },
        {
          employee_id: 37,
          first_name: 'Анастасия',
          last_name: 'Светлакова',
          branch_id: 4,
        },
        {
          employee_id: 42,
          first_name: 'Алина',
          last_name: 'Михалкова',
          branch_id: 3,
        },
        {
          employee_id: 44,
          first_name: 'Сергей',
          last_name: 'Петросов',
          branch_id: 3,
        },
        {
          employee_id: 45,
          first_name: 'София',
          last_name: 'Станиславова',
          branch_id: 3,
        },
        {
          employee_id: 46,
          first_name: 'Арсен',
          last_name: 'Вартанянц',
          branch_id: 4,
        },
        {
          employee_id: 47,
          first_name: 'Сергей',
          last_name: 'Топунков',
          branch_id: 4,
        },
        {
          employee_id: 48,
          first_name: 'Павел',
          last_name: 'Каньшин',
          branch_id: 4,
        },
        {
          employee_id: 49,
          first_name: 'Степана',
          last_name: 'Кириенко',
          branch_id: 4,
        },
        {
          employee_id: 50,
          first_name: 'Александра',
          last_name: 'Якименко',
          branch_id: 4,
        },
        {
          employee_id: 51,
          first_name: 'Елизваета',
          last_name: 'Щенкова',
          branch_id: 5,
        },
        {
          employee_id: 52,
          first_name: 'Андре',
          last_name: 'Станиславич',
          branch_id: 5,
        },
        {
          employee_id: 53,
          first_name: 'Владилен',
          last_name: 'Минин',
          branch_id: 5,
        },
        {
          employee_id: 54,
          first_name: 'Евгения',
          last_name: 'Якименко',
          branch_id: 5,
        },
        {
          employee_id: 55,
          first_name: 'Кирилл',
          last_name: 'Владов',
          branch_id: 5,
        },
        {
          employee_id: 56,
          first_name: 'Евгений',
          last_name: 'Габаренков',
          branch_id: 6,
        },
        {
          employee_id: 57,
          first_name: 'Иван',
          last_name: 'Иванов',
          branch_id: 6,
        },
        {
          employee_id: 58,
          first_name: 'Николай',
          last_name: 'Петровский',
          branch_id: 6,
        },
        {
          employee_id: 59,
          first_name: 'Глеб',
          last_name: 'Шарапов',
          branch_id: 6,
        },
        {
          employee_id: 60,
          first_name: 'Зинаида',
          last_name: 'Орлова',
          branch_id: 6,
        },
        {
          employee_id: 61,
          first_name: 'Владислава',
          last_name: 'Фролова',
          branch_id: 6,
        },
        {
          employee_id: 63,
          first_name: 'Сусанна',
          last_name: 'Григорянц',
          branch_id: 6,
        },
        {
          employee_id: 64,
          first_name: 'Александр',
          last_name: 'Эчушин',
          branch_id: 2,
        },
        {
          employee_id: 65,
          first_name: 'Владимир',
          last_name: 'Степанянц',
          branch_id: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employees', null, {});
  },
};
