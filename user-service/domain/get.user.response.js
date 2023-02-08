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

  getFirstName() {
    return this.first_name;
  }

  setFirstName(first_name) {
    return this.first_name;
  }

  getLastName() {
    return this.last_name;
  }

  setLastName(last_name) {
    return this.last_name;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    return this.email;
  }

  getDateOfBirth() {
    return this.date_of_birth;
  }

  setDateOfBirth(date_of_birth) {
    return this.date_of_birth;
  }

  getAddress() {
    return this.address;
  }

  setAddress(address) {
    return this.address;
  }

  getPhone() {
    return this.phone;
  }

  setPhone(phone) {
    return this.phone;
  }
};
