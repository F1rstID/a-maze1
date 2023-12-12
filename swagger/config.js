const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'a-maze CondingTest',
      version: '1.0.0',
      description: 'a-maze CodingTest Api Docs',
    },
    host: 'ec2-43-200-8-38.ap-northeast-2.compute.amazonaws.com',
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
