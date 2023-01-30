const db = require('../schema/index');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const shortUUID = require('short-uuid');
const RefreshToken = db.db.refresh_token;

const createRefreshToken = async (userId) => {
  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 48);

  const refreshToken = jwt.sign({ id: userId }, config.refreshTokenSecret, {
    expiresIn: '48h',
  });
  const _token = refreshToken;
  try {
    const refreshToken = await RefreshToken.create({
      id: shortUUID.generate(),
      refresh_token: _token,
      expiration_date: expiredAt.getTime(),
      userInformationId: userId,
    });
    return refreshToken.dataValues.refresh_token;
  } catch (err) {
    console.log(err);
  }
};

const deleteIfExpired = async (token) => {
  const getTokenTime = await RefreshToken.findOne({
    where: {
      refresh_token: token,
    },
  });
  const isExpired = getTokenTime.dataValues.expiration_date;
  if (isExpired < new Date().getTime()) {
    RefreshToken.destroy({
      where: {
        refresh_token: token,
      },
    });
    return true;
  }
  return false;
};
module.exports = { createRefreshToken, deleteIfExpired };
