const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'a-maze CondingTest',
      version: '1.0.0',
      description: 'a-maze CodingTest Api Docs',
    },
    host: 'localhost:3000',
    basePath: '/',
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        in: 'cookie',
        name: 'Authorization',
      },
    },
  },
  apis: ['./routes/*.js', './swagger/*'],
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpecs, swaggerUi };
