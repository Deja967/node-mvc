module.exports = class UserLoginResponse {
  constructor(email, token, refreshToken) {
    this.email = email;
    this.token = token;
    this.refreshToken = refreshToken;
  }
};
