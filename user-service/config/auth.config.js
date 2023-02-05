require('dotenv').config();

module.exports = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  FORGOT_PASSWORD_SECRET: process.env.FORGOT_PASSWORD_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  BASE_URL: process.env.BASE_URL,
};
