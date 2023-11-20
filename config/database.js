import mysql from 'mysql2';

const dbConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'COMPANY'
};

const pool = mysql.createPool(dbConfig);

pool.on('connection', (connection) => {
  console.log('Установлено новое соединение с базой данных');
});

pool.on('acquire', (connection) => {
  console.log('Соединение получено из пула');
});

pool.on('enqueue', () => {
  console.log('Соединение добавлено в очередь запросов');
});

pool.on('release', (connection) => {
  console.log('Соединение возвращено в пул');
});

export { pool };