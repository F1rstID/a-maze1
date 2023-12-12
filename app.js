require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.js');
const httpExceptionHandler = require('./middlewares/http.exception.middleware');

const app = express();
const port = process.env.PORT;
const viewsPath = __dirname + '/views/';

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());
app.use('/api', indexRouter);
app.get('/login', (req, res) => {
  res.sendFile(viewsPath + 'login.html');
});
app.get('/terms', (req, res) => {
  res.sendFile(viewsPath + 'terms.html');
});
app.get('/main', (req, res) => {
  res.sendFile(viewsPath + 'main.html');
});

//* Error 핸들링을 위한 Middleware
app.use(httpExceptionHandler);

app.listen(port, () => {});
