require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = config;
