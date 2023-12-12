const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'a-maze CodingTest',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.swagger.js'],
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
