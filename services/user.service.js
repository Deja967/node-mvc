const userRepository = require('../repository/user.repository');
const newUserResponse = require('../domain/create.user.response');
const getUserResponse = require('../domain/get.user.response');
const db = require('../schema');
const getUserAddress = require('../domain/get.user.address');
const userLoginResponse = require('../domain/login.user.response');

const constants = require('../utils/constants');
const { add } = require('lodash');
const getUserPosts = require('../domain/get.user.post.response');

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
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUserInfo({ email }) {
    try {
      const response = await this.repository.fetchAllUserInfo({
        email,
      });
      if (response == constants.doesUserExist) {
        return response;
      }
      let addresses = response.userAddress.map((address) => {
        return new getUserAddress(
          address.address,
          address.unit,
          address.city,
          address.state,
          address.zip_code
        );
      });
      let posts = response.userPostData.data.map((post) => {
        return new getUserPosts(
          post.post_id,
          post.created_at,
          post.updated_at,
          post.message,
          post.user_id,
          post.comment_id,
          post.like_id
        );
      });
      const responseBody = new getUserResponse(
        response.user.dataValues.first_name,
        response.user.dataValues.last_name,
        response.user.dataValues.email,
        response.user.dataValues.date_of_birth,
        addresses,
        posts,
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
      console.log(err);
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
      console.log(err);
    }
  }
}
module.exports = userService;
