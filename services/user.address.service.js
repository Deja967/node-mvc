const UserAddressRepository = require('../repository/user.address.repository');
const repository = new UserAddressRepository();

module.exports = class UserAddressService {
  async addNewAddress(email, address) {
    const response = await repository.addAddress(email, address);
  }
};
