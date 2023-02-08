const AuthRepository = require('../repository/auth.repository');
const repository = new AuthRepository();

module.exports = class AuthService {
  async signUp({ email, password }) {
    try {
      const response = await repository.createNewUser({
        email,
        password,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async loginUser({ email, password }) {
    try {
      const response = await repository.loginUser({
        email,
        password,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async forgotPassword({ email }) {
    try {
      const response = await repository.forgotPassword({
        email,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
};
