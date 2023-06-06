const express = require('express');
const db = require('./config/mongoose');
const port = 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./routes');
app.use('/', router);

app.listen(port, () => {
  console.log('Server started on port, ', port);
});