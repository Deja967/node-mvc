const db = require('../schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');

const short = require('short-uuid');
const constants = require('../utils/constants');

const User = db.user;
const Address = db.address;

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

  async getUserInfo({ email, password, res }) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!user || !isPasswordValid) {
        return constants.err;
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async fetchAllUserInfo({ email }) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      const userAddress = await Address.findOne({
        where: {
          userInformationId: user.dataValues.id,
        },
      });
      const data = {
        user,
        userAddress,
      };
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async fetchAllUsers() {
    try {
      const user = await User.findAll({ order: [['createdAt', 'ASC']] });
      const userAddress = await Address.findAll({
        order: [['createdAt', 'ASC']],
      });
      const data = {
        user,
        userAddress,
      };

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = userRepository;
