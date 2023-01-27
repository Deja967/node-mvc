const UserAddressRepository = require('../repository/user.address.repository');
const repository = new UserAddressRepository();

module.exports = class UserAddressService {
  constructor() {
    this.repository = new UserAddressRepository();
  }

  async addNewAddress(email, address) {
    try {
      const response = await this.repository.addAddress(email, address);
      if (response == 'user doesnt exist in db') {
        return "user doesn't exist in db";
      }
      return 'Address added successfully';
    } catch (err) {
      console.log(err);
    }
  }

  async updateAddress(email, address) {
    try {
      const response = await this.repository.updateUserAddress(email, address);
      if (response == "user doesn't exist in db") {
        return "user doesn't exist in db";
      }
      if (response == "address doesn't exist in db") {
        return "address doesn't exist in db";
      }
      return 'Address(s) successfully updated';
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
      if (response == "user doesn't exist in db") {
        return "user doesn't exist in db";
      }
      if (response == "address doesn't exist in db") {
        return "address doesn't exist in db";
      }
      return 'Address(s) successfully removed';
    } catch (err) {
      console.log(err);
    }
  }
};
