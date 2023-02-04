const short = require('short-uuid');
const db = require('../schema');
const ForgotPasswordToken = db.db.forgot_password;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const constants = require('../utils/constants');

const createForgotPasswordToken = async (userId) => {
  const utcSeconds = new Date();
  utcSeconds.setSeconds(utcSeconds.getSeconds() + 600);
  const newPasswordToken = jwt.sign(
    { id: userId },
    config.FORGOT_PASSWORD_SECRET,
    {
      expiresIn: '10m',
    }
  );
  const token = await ForgotPasswordToken.create({
    id: short.generate(),
    userInformationId: userId,
    forgot_token: newPasswordToken,
    expiration_date: utcSeconds.toISOString(),
  });

  const oldToken = await ForgotPasswordToken.findOne({
    where: {
      userInformationId: userId,
      expiration_date: {
        [op.lt]: token.expiration_date,
      },
    },
  });
  if (!oldToken) {
    return 'no token found';
  } else {
    await ForgotPasswordToken.destroy({
      where: {
        id: oldToken.dataValues.id,
      },
    });
    return token;
  }
};

module.exports = { createForgotPasswordToken };
