require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  JWT_COOKIE_SECRET: process.env.ACCESS_TOKEN_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
