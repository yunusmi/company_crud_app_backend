import { Dialect } from 'sequelize';

export interface DBConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
}
