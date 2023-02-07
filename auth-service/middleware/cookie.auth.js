const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const setCookie = async (req, res, next) => {
  const email = req.body.email;

  const userId = await prisma.user.findFirst({
    where: { email },
  });
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
  next();
};

module.exports = { setCookie };
