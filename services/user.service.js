const userRepository = require('../repository/user.repository');
const newUserResponse = require('../domain/create.user.response');
const getUserResponse = require('../domain/get.user.response');
const db = require('../schema');
const getUserAddress = require('../domain/get.user.address');
const userLoginResponse = require('../domain/login.user.response');

const constants = require('../utils/constants');

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
    address,
    phone,
  }) {
    try {
      const response = await this.repository.createNewUser({
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        address,
        phone,
      });
      const responseBody = new newUserResponse(
        response.dataValues.email,
        'Sign up successful'
      );
      return responseBody;
    } catch (err) {
      console.log(err);
    }
  }

  async signIn({ email, password, res }) {
    try {
      const response = await this.repository.getUserInfo({
        email,
        password,
      });
      if (response == constants.err) {
        return response;
      }
      const userLoginBody = new userLoginResponse(email, '23123', '1231');
      const data = {
        userLoginBody,
        response,
      };
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUserInfo({ email }) {
    try {
      const response = await this.repository.fetchAllUserInfo({
        email,
      });
      const responseBody = new getUserResponse(
        response.user.dataValues.first_name,
        response.user.dataValues.last_name,
        response.user.dataValues.email,
        response.user.dataValues.password,
        response.user.dataValues.date_of_birth,
        [
          new getUserAddress(
            response.userAddress.dataValues.address,
            response.userAddress.dataValues.unit,
            response.userAddress.dataValues.city,
            response.userAddress.dataValues.state,
            response.userAddress.dataValues.zip_code
          ),
        ],
        response.user.dataValues.phone
      );

      return responseBody;
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  }
}
module.exports = userService;

// let usersList = JSON.parse(response);
// let newUsers = usersList.map((user) => {
//   let addresses = user.addresses.map((address) => {
//     return new Address(
//       address.address,
//       address.unit,
//       address.city,
//       address.state
//     );
//   });
//   return new User(
//     user.first_name,
//     user.last_name,
//     user.email,
//     user.date_of_birth,
//     user.phone,
//     user.last_login,
//     addresses
//   );
// });
