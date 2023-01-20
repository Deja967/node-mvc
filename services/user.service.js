const userRepository = require('../repository/user.repository');
const userResponse = require('../domain/create.user.response');
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
      const responseBody = new userResponse(
        response.dataValues.first_name,
        response.dataValues.last_name,
        response.dataValues.email,
        response.dataValues.password,
        response.dataValues.date_of_birth,
        response.dataValues.address,
        response.dataValues.phone
      );

      const data = {
        first_name: responseBody.getFirstName(),
        last_name: responseBody.getLastName(),
        email: responseBody.getEmail(),
        password: responseBody.getPassword(),
        date_of_birth: responseBody.getDateOfBirth(),
        address: responseBody.getAddress(),
        phone: responseBody.getPhone(),
      };
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = userService;
