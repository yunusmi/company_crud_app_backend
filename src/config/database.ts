import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { DBConfig } from '../utils/interfaces';

dotenv.config();

const db: DBConfig = {
  development: {
    username: process.env.DB_DEV_USERNAME!,
    password: process.env.DB_DEV_PASSWORD!,
    database: process.env.DB_DEV_NAME!,
    host: process.env.DB_DEV_HOST!,
    dialect: process.env.DB_DEV_DIALECT as Dialect,
  },
  production: {
    username: process.env.DB_PROD_USERNAME!,
    password: process.env.DB_PROD_PASSWORD!,
    database: process.env.DB_PROD_NAME!,
    host: process.env.DB_PROD_HOST!,
    dialect: process.env.DB_PROD_DIALECT as Dialect,
  },
};

export { db };
