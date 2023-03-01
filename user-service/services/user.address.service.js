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
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateAddress(email, address) {
    try {
      const response = await this.repository.updateUserAddress(email, address);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteAddress(email, addressId) {
    try {
      const response = await this.repository.destroyUserAddress(
        email,
        addressId
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
};
