const userRepository = require('../repository/user.repository');
const db = require('../schema');
const constants = require('../utils/constants');

class userService {
  constructor() {
    this.repository = new userRepository();
  }

  async getAllUserInfo({ email }) {
    try {
      const response = await this.repository.fetchAllUserInfo({
        email,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getAllUsers() {
    try {
      const response = await this.repository.fetchAllUsers();
      // Note for future use
      // let names = response.map((user) => user.first_name);
      // console.log(names);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(first_name, last_name, email, date_of_birth, phone) {
    try {
      const response = await this.repository.updateUser(
        first_name,
        last_name,
        email,
        date_of_birth,
        phone
      );
      if (response == constants.doesUserExist) {
        return constants.doesUserExist;
      }
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(email) {
    try {
      const response = await this.repository.deleteUser(email);
      if (response == constants.doesUserExist) {
        return constants.doesUserExist;
      }
      return response;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = userService;
