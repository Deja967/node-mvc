const db = require('../schema');
const constants = require('../utils/constants');
const getUserResponse = require('../domain/get.user.response');
const getUserAddress = require('../domain/get.user.address');
const Api404Error = require('../utils/errors/404');

const User = db.db.user;
const Address = db.db.address;

class userRepository {
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
        throw new Api404Error();
      }
      let addresses = userAddress.map((address) => {
        return new getUserAddress(
          address.address,
          address.unit,
          address.city,
          address.state,
          address.zip_code
        );
      });

      const responseBody = new getUserResponse(
        user.dataValues.first_name,
        user.dataValues.last_name,
        user.dataValues.email,
        user.dataValues.date_of_birth,
        addresses,
        user.dataValues.phone
      );
      return responseBody;
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
