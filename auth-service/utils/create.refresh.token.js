const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const short = require('short-uuid');
const Api404Error = require('../utils/errors/404');
const Api401Error = require('../utils/errors/401');
const httpStatusCodes = require('./httpStatusCodes');
const { ErrorMessages } = require('../utils/constants');

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
    throw err;
  }
};

const deleteIfExpired = async (token) => {
  try {
    const findTokenToDelete = await prisma.refreshToken.deleteMany({
      where: {
        refresh_token: token,
      },
    });

    if (findTokenToDelete.count === 0) {
      return new Api404Error(
        ErrorMessages.NOT_FOUND_ERROR,
        httpStatusCodes.NOT_FOUND,
        'Refresh token not found'
      );
    } else {
      await prisma.refreshToken.deleteMany({
        where: {
          refresh_token: token,
        },
      });
      throw new Api401Error();
    }
  } catch (err) {
    throw err;
  }
};
module.exports = { createRefreshToken, deleteIfExpired };
