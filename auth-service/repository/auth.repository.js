const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');

const short = require('short-uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CreateNewUser = require('../domain/create.user.response');
const NewAccessToken = require('../domain/new.access.token');
const { ResponseMessages } = require('../utils/constants');
const {
  createRefreshToken,
  deleteIfExpired,
} = require('../utils/create.refresh.token');
const {
  createForgotPasswordToken,
} = require('../utils/create.forgot.password.token');

const Api401Error = require('../utils/errors/401');
const Api404Error = require('../utils/errors/404');

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
      const user = await deleteIfExpired(token);
      console.log('user :', user);

      let newAccessToken = jwt.sign({ id: user }, config.accessTokenSecret, {
        expiresIn: '24h',
      });
      return new NewAccessToken(newAccessToken);
    } catch (err) {
      console.log('err 2: ', err);

      throw err;
    }
  }

  async forgotPassword({ email }) {
    try {
      const user = await prisma.user.findFirst({ where: { email } });
      const userId = user.id;
      const token = await createForgotPasswordToken(userId);
      const link = `${config.BASE_URL}/reset-password?token=${token.forgot_token}&id=${userId}`;
      // sendEmail(link);
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
};
