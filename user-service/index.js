require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const forgotPasswordController = require('./controller/forgot.password.controller');
const usersController = require('./controller/user.controller');
const userAddressController = require('./controller/user.address.controller');
const refreshController = require('./controller/refresh.token.controller');

const PORT = process.env.PORT;

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

app.use('/', usersController);
app.use('/', userAddressController);
app.use('/', refreshController);

(async () => {
  await db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  });
})();
