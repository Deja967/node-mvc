const getUserAddress = require('../domain/get.user.address');
const getUserPost = require('../domain/get.user.post.response');
module.exports = class getNewUser {
  constructor(
    first_name,
    last_name,
    email,
    date_of_birth,
    address = [new getUserAddress()],
    phone
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.date_of_birth = date_of_birth;
    this.address = address;
    this.phone = phone;
  }
};
