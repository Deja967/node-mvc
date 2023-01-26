const RefreshTokenRepository = require('../repository/refresh.token.repository');

class RefreshTokenService {
  constructor() {
    this.repository = new RefreshTokenRepository();
  }

  async refreshToken({ refresh_token }) {
    // if (!cookie?.jwt) {
    //   return 'incorrect cookie';
    // }
    if (refresh_token == null) {
      return 'Refresh token is required';
    }
    const response = this.repository.checkToken({ refresh_token });
    return response;
  }
}

module.exports = RefreshTokenService;
