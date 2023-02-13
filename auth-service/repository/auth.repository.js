const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');

const short = require('short-uuid');

const CreateNewUser = require('../domain/create.user.response');
const NewAccessToken = require('../domain/new.access.token');
const { ResponseMessages, ErrorMessages } = require('../utils/constants');
const { createRefreshToken } = require('../utils/create.refresh.token');
const {
  createForgotPasswordToken,
} = require('../utils/create.forgot.password.token');

const { sendEmail } = require('../utils/send.email');
const Api400Error = require('../utils/errors/400');
const Api401Error = require('../utils/errors/401');
const Api404Error = require('../utils/errors/404');
const httpStatusCodes = require('../utils/httpStatusCodes');

module.exports = class AuthRepository {
  async createNewUser({ email, password }) {
    const user = await prisma.user.create({
      data: {
        id: short.generate(),
        email: email,
        password: bcrypt.hashSync(password, saltRounds),
      },
    });
    const response = new CreateNewUser(
      user.email,
      ResponseMessages.REGISTER_USER_SUCCESS
    );
    return response;
  }
  catch(err) {
    console.log(err);
  }

  async loginUser({ email, password }) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Api404Error();
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!user || !isPasswordValid) {
        throw new Api401Error();
      }
      const refreshToken = await createRefreshToken(user.id);
      const data = {
        email: user.email,
        id: user.id,
        refresh: refreshToken,
      };
      return data;
    } catch (err) {
      throw err;
    }
  }

  async newRefreshToken(token) {
    try {
      const user = await prisma.refreshToken.findFirst({
        where: {
          refresh_token: token,
        },
      });
      let newAccessToken = jwt.sign(
        { id: user.userId },
        config.accessTokenSecret,
        {
          expiresIn: '24h',
        }
      );
      return new NewAccessToken(newAccessToken);
    } catch (err) {
      throw err;
    }
  }

  async forgotPassword({ email }) {
    try {
      const user = await prisma.user.findFirst({ where: { email } });
      const userId = user.id;
      const token = await createForgotPasswordToken(userId);
      const link = `${config.BASE_URL}/reset-password?token=${token.forgot_token}&id=${userId}`;
      sendEmail(link);
      const data = {
        message:
          'We have received a request to reset your password. please click on this link to reset your password.',
        link: link,
      };
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async resetPassword(token, password) {
    try {
      const userToken = await prisma.user.findFirst({
        where: {
          forgot_token: {
            some: {
              forgot_token: token,
            },
          },
        },
      });
      const isValid = bcrypt.compareSync(password, userToken.password);
      if (isValid) {
        throw new Api400Error(
          ErrorMessages.BAD_REQUEST,
          httpStatusCodes.BAD_REQUEST,
          ErrorMessages.PASSWORD_SAME
        );
      }
      const newPassword = bcrypt.hashSync(password, saltRounds);
      await prisma.user.updateMany({
        where: { id: userToken.userId },
        data: {
          password: newPassword,
        },
      });
      return ResponseMessages.UPDATE_PASSWORD_SUCCESS;
    } catch (err) {
      throw err;
    }
  }
};
