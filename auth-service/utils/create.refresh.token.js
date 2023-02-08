const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const short = require('short-uuid');
const Api404Error = require('../utils/errors/404');
const Api401Error = require('../utils/errors/401');

const createRefreshToken = async (userId) => {
  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 48);

  const refreshToken = jwt.sign({ id: userId }, config.refreshTokenSecret, {
    expiresIn: '48h',
  });
  const _token = refreshToken;
  try {
    const refreshToken = await prisma.refreshToken.create({
      data: {
        id: short.generate(),
        refresh_token: _token,
        expiration_date: expiredAt.toISOString(),
        userId: userId,
      },
    });
    return refreshToken.refresh_token;
  } catch (err) {
    console.log(err);
  }
};

const deleteIfExpired = async (token) => {
  try {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        refresh_token: token,
      },
    });
    if (!refreshToken) {
      throw new Api404Error();
    }
    const isExpired = refreshToken.expiration_date;
    if (isExpired < new Date().getTime()) {
      prisma.refreshToken.delete({
        where: {
          refresh_token: token,
        },
      });
      throw new Api401Error();
    }
    return refreshToken.userId;
  } catch (err) {
    console.log('err :', err);
    throw err;
  }
};
module.exports = { createRefreshToken, deleteIfExpired };
