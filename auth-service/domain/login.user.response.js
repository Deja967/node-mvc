module.exports = class userLoginResponse {
  constructor(email, access_token, refresh_token) {
    this.email = email;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
};
