require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.js');
const httpExceptionHandler = require('./middlewares/http.exception.middleware');
const { swaggerUi, swaggerSpecs } = require('./swagger/config');

const app = express();
const port = process.env.PORT;
const viewsPath = __dirname + '/views/';

//* Client와 원할하게 통신하기 위한 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//* Server의 Api Router
app.use('/api', indexRouter);

//* Client Rendering
app.get('/cert', (req, res) => {
  res.sendFile(viewsPath + 'cert.html');
});
app.get('/terms', (req, res) => {
  res.sendFile(viewsPath + 'terms.html');
});
app.get('/main', (req, res) => {
  res.sendFile(viewsPath + 'main.html');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//* Error 핸들링을 위한 Middleware
app.use(httpExceptionHandler);

app.listen(port, () => {});
