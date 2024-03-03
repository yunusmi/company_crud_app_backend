import http from 'http';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { routes } from './routes/index.js';
import { sequelize } from './connector/index.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(routes);

sequelize
  .sync()
  .then(() => {
    console.log('Соединение с базой данный установлено');
  })
  .catch(() => {
    console.error('Ошибка подключения к базе данных');
  });

app.use((req, res, next) => {
  console.log('----------------------');
  console.log(`Новый запрос: ${req.method} - ${req.baseUrl}`);
  next();
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.originalUrl} не найден`);
  error.statusCode = 404;
  next(error);
});

const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.APP_HOST || 'localhost';

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Сервер запущен на ${HOST}:${PORT}`);
});
