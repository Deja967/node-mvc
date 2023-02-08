const db = require('../schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios');
const constants = require('../utils/constants');
const { find } = require('lodash');
const e = require('express');
const getUserResponse = require('../domain/get.user.response');
const getUserAddress = require('../domain/get.user.address');
const Api401Error = require('../utils/errors/401');
const Api404Error = require('../utils/errors/404');

const User = db.db.user;
const Address = db.db.address;

class userRepository {
  async createNewUser({
    first_name,
    last_name,
    email,
    password,
    date_of_birth,
    address,
    phone,
  }) {
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: bcrypt.hashSync(password, saltRounds),
      date_of_birth: date_of_birth,
      phone: phone,
    });
    await Address.create({
      address: address[0].address,
      unit: address[0].unit,
      city: address[0].city,
      state: address[0].state,
      zip_code: address[0].zip,
      userInformationId: user.id,
    });
    return user;
  }
  catch(err) {
    console.log(err);
  }

  async getUserInfo({ email, password }) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      const isPasswordValid = bcrypt.compareSync(
        password,
        user.dataValues.password
      );
      if (!user || !isPasswordValid) {
        throw new Api401Error();
      }
      await User.update(
        {
          last_login: constants.nodeDate,
        },
        {
          where: {
            id: user.dataValues.id,
          },
        }
      );
      const data = {
        email: user.dataValues.email,
        id: user.dataValues.id,
      };
      return data;
    } catch (err) {
      throw err;
    }
  }
  async fetchAllUserInfo({ email }) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Api404Error();
      }
      const userAddress = await Address.findAll({
        where: {
          userInformationId: user.dataValues.id,
        },
        order: [['createdAt', 'DESC']],
      });
      if (!userAddress) {
        const data = {
          user,
        };
        return data;
      } else {
        const data = {
          user,
          userAddress,
        };
        return data;
      }
    } catch (err) {
      throw err;
    }
  }

  async fetchAllUsers() {
    try {
      const userJoin = await User.findAll({
        attributes: [
          'id',
          'first_name',
          'last_name',
          'email',
          'date_of_birth',
          'phone',
          'last_login',
        ],
        include: {
          model: Address,
          as: 'addresses',
          attributes: [
            'address',
            'unit',
            'city',
            'state',
            'zip_code',
            'createdAt',
          ],
        },
        order: [[{ model: Address, as: 'addresses' }, 'createdAt', 'DESC']],
      });
      const newData = userJoin.map((person) => {
        const {
          first_name,
          last_name,
          email,
          date_of_birth,
          phone,
          last_login,
        } = person;
        const addresses = person.addresses.map((address) => {
          return {
            address: address.address,
            unit: address.unit,
            city: address.city,
            state: address.state,
            zip: address.zip_code,
          };
        });
        return [
          {
            first_name,
            last_name,
            email,
            date_of_birth,
            phone,
            last_login,
            addresses,
          },
        ];
      });
      const data = JSON.parse(JSON.stringify(newData));
      const jsonWithoutBrackets = data.map((innerArray) => innerArray[0]);
      return jsonWithoutBrackets;
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(first_name, last_name, email, date_of_birth, phone) {
    try {
      const findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        throw new Api404Error();
      }
      await User.update(
        {
          first_name: first_name,
          last_name: last_name,
          date_of_birth: date_of_birth,
          phone: phone,
        },
        {
          where: {
            email: email,
            id: findUser.id,
          },
        }
      );
      return constants.updateUserSuccess;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(email) {
    try {
      const findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        throw new Api404Error();
      }
      await User.destroy({
        where: {
          email: email,
          id: findUser.id,
        },
      });
      await Address.destroy({
        where: {
          userInformationId: findUser.id,
        },
      });
      return constants.deleteUserSuccess;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = userRepository;
