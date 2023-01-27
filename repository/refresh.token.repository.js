const { deleteIfExpired } = require('../middleware/create.refresh.token');
const db = require('../schema/index');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const RefreshToken = db.db.refresh_token;

class RefreshTokenRepository {
  async checkToken({ refresh_token }) {
    try {
      const response = await RefreshToken.findOne({
        where: {
          refresh_token: refresh_token,
        },
      });
      if (!response) {
        return 'token does not exist';
      }

      if (deleteIfExpired(refresh_token) == true) {
        return 'make new login req token expired';
      }

      //make new refresh Token
      //look up sequelize lazy loading
      //const user = await response.getUser();
      const userId = response.dataValues.userInformationId;
      let newAccessToken = jwt.sign({ id: userId }, config.refreshTokenSecret, {
        expiresIn: '24h',
      });
      return newAccessToken;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = RefreshTokenRepository;
