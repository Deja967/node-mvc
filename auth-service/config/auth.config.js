require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  forgotPasswordSecret: process.env.FORGOT_PASSWORD_SECRET,
  BASE_URL: process.env.BASE_URL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  VERIFIED_SENDER: process.env.VERIFIED_SENDER,
};

module.exports = config;
