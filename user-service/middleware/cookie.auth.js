const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const setCookie = async (res, userId) => {
  const token = jwt.sign({ id: userId }, config.accessTokenSecret, {
    expiresIn: '24h',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    maxAge: 30000,
    maxAge: 24 * 60 * 60 * 1000,
    withCredentials: true,
  });
  return token;
};

module.exports = { setCookie };
