require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('첫페이지');
});

app.listen(port, () => {});
