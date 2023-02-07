const bcrypt = require('bcrypt');
const saltRounds = 10;
const short = require('short-uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CreateNewUser = require('../domain/create.user.response');
const { ResponseMessages } = require('../utils/constants');
const Api401Error = require('../../user-service/utils/errors/401');

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
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!user || !isPasswordValid) {
        throw new Api401Error();
      }
      const data = {
        email: user.email,
        id: user.id,
      };
      return data;
    } catch (err) {
      throw err;
    }
  }
};
