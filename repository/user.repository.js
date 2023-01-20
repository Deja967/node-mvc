const db = require('../schema');
const bcrypt = require('bcrypt');

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
      const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        date_of_birth: date_of_birth,
        address: address,
        phone: phone,
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = userRepository;
