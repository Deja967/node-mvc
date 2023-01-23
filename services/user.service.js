const userRepository = require('../repository/user.repository');
const newUserResponse = require('../domain/create.user.response');
const getUserResponse = require('../domain/get.user.response');
const db = require('../schema');
const getUserAddress = require('../domain/get.user.address');

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
}
module.exports = userService;
