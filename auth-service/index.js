const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config/auth.config');

const authController = require('./controller/auth.controller');
const PORT = config.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(cookieParser());

app.use('/', authController);

app.listen(8085, () => {
  console.log(`Server started on port 8085`);
});
