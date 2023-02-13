const db = require('../schema');
const short = require('short-uuid');
const User = db.db.user;
const config = require('../config/auth.config');
const sendEmail = require('../utils/send.email');

module.exports = class ForgotPasswordRepository {
  async forgotPassword(email) {
    const user = await User.findOne({ where: { email } });
    const userId = user.dataValues.id;
    const token = '12tfg3wr23';
    const link = `${config.BASE_URL}/reset-password?token=${token.dataValues.forgot_token}&id=${userId}`;
    sendEmail(link);
    const data = {
      message:
        'We have received a request to reset your password. please click on this link to reset your password.',
      link: link,
    };
    return data;
  }
};
