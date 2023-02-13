const short = require('short-uuid');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createForgotPasswordToken = async (userId) => {
  const utcSeconds = new Date();
  utcSeconds.setSeconds(utcSeconds.getSeconds() + 600);
  const newPasswordToken = jwt.sign(
    { id: userId },
    config.forgotPasswordSecret,
    {
      expiresIn: '10m',
    }
  );

  const token = await prisma.forgotToken.create({
    data: {
      id: short.generate(),
      forgot_token: newPasswordToken,
      expiration_date: utcSeconds.toISOString(),
      userId: userId,
    },
  });

  const oldToken = await prisma.forgotToken.findMany({
    where: {
      userId: userId,
      expiration_date: {
        //less than
        lt: token.expiration_date,
      },
    },
  });

  if (oldToken.length === 0) {
  } else {
    await prisma.forgotToken.deleteMany({
      where: {
        id: {
          in: oldToken.map((id) => id.id),
        },
      },
    });
  }
  return token;
};

module.exports = { createForgotPasswordToken };
