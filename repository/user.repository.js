const db = require('../schema');
const bcrypt = require('bcrypt');

const short = require('short-uuid');

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
    try {
      const id = short.generate();
      const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        date_of_birth: date_of_birth,
        addressId: id,
        phone: phone,
      });
      const userAddress = await Address.create({
        address: address[0].address,
        unit: address[0].unit,
        city: address[0].city,
        state: address[0].state,
        zip_code: address[0].zip,
        addressId: id,
        userInformationId: user.id,
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = userRepository;
