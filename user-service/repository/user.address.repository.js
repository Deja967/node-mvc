const db = require('../schema');
const { ResponseMessages, ErrorMessages } = require('../utils/constants');
const constants = require('../utils/constants');

const Api404Error = require('../utils/errors/404');

const User = db.db.user;
const Address = db.db.address;

module.exports = class UserAddressRepository {
  async addAddress(email, address) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Api404Error();
      }

      await address.map((address) => {
        return Address.create({
          address: address.address,
          unit: address.unit,
          city: address.city,
          state: address.state,
          zip_code: address.zip_code,
          userInformationId: user.id,
        });
      });
      return ResponseMessages.ADDRESS_ADDED_SUCCESS;
    } catch (err) {
      throw err;
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
        throw new Api404Error();
      }
      await address.map((address) => {
        Address.update(
          {
            address: address.address,
            unit: address.unit,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
          },
          {
            where: {
              userInformationId: user.dataValues.id,
              id: address.id,
            },
          }
        );
      });
      return ResponseMessages.ADDRESS_UPDATED_SUCCESS;
    } catch (err) {
      throw err;
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
        throw new Api404Error();
      }
      const address = await Address.destroy({
        where: {
          userInformationId: user.dataValues.id,
          id: addressId,
        },
      });
      if (!address) {
        throw new Api404Error(
          undefined,
          undefined,
          ErrorMessages.ADDRESS_NOT_FOUND
        );
      }
      return ResponseMessages.ADDRESS_DELETED_SUCCESS;
    } catch (err) {
      throw err;
    }
  }
};
