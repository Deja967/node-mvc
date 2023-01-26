const constants = require('../utils/constants');
const { verifyRefreshToken } = require('../middleware/jwt.auth');
const { setCookie } = require('../middleware/cookie.auth');

const RefreshTokenService = require('../services/refresh.token.service');
const service = new RefreshTokenService();
const express = require('express');
const router = express.Router();

router.get(constants.refreshToken, verifyRefreshToken, async (req, res) => {
  const refresh_token = req.headers.authorization.split(' ')[1];
  const response = await service.refreshToken({ refresh_token });
  const newToken = await setCookie(res, response);
  return res.status(200).send({ access_token: newToken });
});

module.exports = router;
