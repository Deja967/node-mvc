const { add } = require('lodash');
const db = require('../schema');
const { addUserAddress } = require('../config/db.layer');

const short = require('short-uuid');

const User = db.db.user;
const Address = db.db.address;
const sequelize = db.db.sequelize;

module.exports = class UserAddressRepository {
  async addAddress(email, address) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return 'user doesnt exist in db';
      }
      const response = await sequelize.query(addUserAddress(email, address));
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async updateUserAddress(email, address) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return "user doesn't exist in db";
      }
      const address_response = await Address.update(
        {
          address: address[0].address,
          unit: address[0].unit,
          city: address[0].city,
          state: address[0].state,
          zip_code: address[0].zip_code,
        },
        {
          where: {
            userInformationId: user.dataValues.id,
            id: address[0].id,
          },
        }
      );
      return 'Address(s) deleted successfully';
    } catch (err) {
      console.log(err);
    }
  }

  async destroyUserAddress(email, addressId) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return "user doesn't exist in db";
      }
      const address = await Address.destroy({
        where: {
          userInformationId: user.dataValues.id,
          id: addressId,
        },
      });
      return 'Address(s) deleted successfully';
    } catch (err) {
      console.log(err);
    }
  }
};
