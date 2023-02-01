module.exports = class userLoginResponse {
  constructor(email, access_token, refresh_token) {
    this.email = email;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }

  getEmail() {
    return this.email;
  }

  getAccessToken() {
    return this.access_token;
  }

  getRefreshToken() {
    return this.refresh_token;
  }
};
