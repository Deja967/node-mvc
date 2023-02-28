const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const setCookie = async (res, userId) => {
  const token = jwt.sign({ id: userId }, config.accessTokenSecret, {
    expiresIn: '24h',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    maxAge: config.MAX_AGE,
    withCredentials: true,
  });
  return token;
};

module.exports = { setCookie };
