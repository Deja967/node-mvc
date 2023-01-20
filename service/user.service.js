const userRepository = require('../repository/user.repository');
const db = require('../schema');

class userService {
  constructor() {
    this.repository = new userRepository();
  }

  async signUp({
    first_name,
    last_name,
    email,
    password,
    date_of_birth,
    phone,
  }) {
    try {
      const response = await this.repository.createNewUser({
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        phone,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = userService;
