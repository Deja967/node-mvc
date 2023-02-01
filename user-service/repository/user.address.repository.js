const db = require('../schema');
const constants = require('../utils/constants');

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
        return constants.doesUserExist;
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
      return constants.addressAddSuccess;
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
        return constants.doesUserExist;
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
      return constants.addressUpdateSuccess;
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
        return constants.doesUserExist;
      }
      const address = await Address.destroy({
        where: {
          userInformationId: user.dataValues.id,
          id: addressId,
        },
      });
      if (!address) {
        return constants.doesAddressExist;
      }
      return constants.addressDeleteSuccess;
    } catch (err) {
      console.log(err);
    }
  }
};
