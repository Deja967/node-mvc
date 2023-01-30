const db = require('../schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios');

const short = require('short-uuid');
const constants = require('../utils/constants');
const { find } = require('lodash');

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

  async getUserInfo({ email, password, res }) {
    console.log(email, password);
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      await User.update(
        {
          last_login: new Date().toJSON().slice(0, 19).replace('T', ' '),
        },
        {
          where: {
            id: user.dataValues.id,
          },
        }
      );

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
      if (!user) {
        return constants.doesUserExist;
      }
      const userAddress = await Address.findAll({
        where: {
          userInformationId: user.dataValues.id,
        },
        order: [['createdAt', 'DESC']],
      });
      const userPost = await axios.get(
        `http://localhost:8081/api/get-all-user-post?userId=${user.dataValues.id}`
      );
      const userPostData = userPost.data;
      const data = {
        user,
        userAddress,
        userPostData,
      };
      return data;
    } catch (err) {
      console.log(err);
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
        return constants.doesUserExist;
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
      console.log(err);
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
        return constants.doesUserExist;
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
      console.log(err);
    }
  }
}

module.exports = userRepository;
