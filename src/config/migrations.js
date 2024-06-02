require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST,
    dialect: process.env.DB_PROD_DIALECT,
    port: Number(process.env.DB_PROD_PORT),
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  };
}

if (process.env.NODE_ENV === 'development') {
  module.exports = {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    dialect: process.env.DB_DEV_DIALECT,
    port: Number(process.env.DB_DEV_PORT),
  };
}
