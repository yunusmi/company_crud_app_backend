import { ConnectionError, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { db } from '../config/database';

dotenv.config();

const dbConfig = db[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    retry: {
      match: [/Deadlock/i, ConnectionError],
      max: 5,
      backoffBase: 3000,
      backoffExponent: 1.5,
      report: (_message, _obj, error) =>
        error &&
        console.log(
          `Ошибка подключения к базе данных: ${error}. Повторная попытка подключения`
        ),
    },
  }
);

export { sequelize };
