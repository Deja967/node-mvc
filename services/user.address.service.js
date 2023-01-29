const UserAddressRepository = require('../repository/user.address.repository');
const constants = require('../utils/constants');
const repository = new UserAddressRepository();

module.exports = class UserAddressService {
  constructor() {
    this.repository = new UserAddressRepository();
  }

  async addNewAddress(email, address) {
    try {
      const response = await this.repository.addAddress(email, address);
      if (response == constants.doesUserExist) {
        return constants.doesUserExist;
      }
      return constants.addressAddSuccess;
    } catch (err) {
      console.log(err);
    }
  }

  async updateAddress(email, address) {
    try {
      const response = await this.repository.updateUserAddress(email, address);
      if (response == constants.doesUserExist) {
        return constants.doesUserExist;
      }
      if (response == constants.doesAddressExist) {
        return constants.doesAddressExist;
      }
      return constants.addressUpdateSuccess;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAddress(email, addressId) {
    try {
      const response = await this.repository.destroyUserAddress(
        email,
        addressId
      );
      //Extract to new method
      if (response == constants.doesUserExist) {
        return constants.doesUserExist;
      }
      if (response == constants.doesAddressExist) {
        return constants.doesAddressExist;
      }
      if (response == constants.addressDeleteSuccess) {
        return constants.addressDeleteSuccess;
      }
      return constants.addressDeleteSuccess;
    } catch (err) {
      console.log(err);
    }
  }
};
