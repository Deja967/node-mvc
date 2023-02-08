const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const short = require('short-uuid');

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

// const deleteIfExpired = async (token) => {
//   const getTokenTime = await prisma.refreshToken.findFirst({
//     where: {
//       refresh_token: token,
//     },
//   });
//   const isExpired = getTokenTime.expiration_date;
//   if (isExpired < new Date().getTime()) {
//     prisma.refreshToken.delete({
//       where: {
//         refresh_token: token,
//       },
//     });
//     return true;
//   }
//   return false;
// };
// module.exports = { createRefreshToken, deleteIfExpired };
module.exports = { createRefreshToken };
