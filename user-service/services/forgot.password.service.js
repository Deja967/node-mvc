const ForgotPasswordRepository = require('../repository/forgot.password.repository');
const repository = new ForgotPasswordRepository();

module.exports = class ForgotPasswordService {
  async forgotPassword(email) {
    const response = repository.forgotPassword(email);
    return response;
  }
};
