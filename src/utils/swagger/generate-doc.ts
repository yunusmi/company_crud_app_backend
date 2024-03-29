import * as dotenv from 'dotenv';
import swaggerAutogen from 'swagger-autogen';
const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

dotenv.config();

const doc = {
  info: {
    title: 'Документация API интерфейсов приложения',
    version: '1.0.0',
    description: '',
  },

  host: `${process.env.APP_HOST}:${process.env.APP_PORT}`,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
