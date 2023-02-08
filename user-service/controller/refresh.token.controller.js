const constants = require('../utils/constants');
const { verifyRefreshToken } = require('../middleware/refresh.token.jwt.auth');
const { setCookie } = require('../middleware/cookie.auth');

const RefreshTokenService = require('../services/refresh.token.service');
const service = new RefreshTokenService();
const express = require('express');
const { RouteEndPoints } = require('../utils/constants');
const router = express.Router();

router.get(
  RouteEndPoints.REFRESH_TOKEN,
  verifyRefreshToken,
  async (req, res) => {
    const refresh_token = req.headers.authorization.split(' ')[1];
    const response = await service.refreshToken({ refresh_token });
    const newToken = await setCookie(res, response);
    return res.status(200).send({ access_token: newToken });
  }
);

module.exports = router;
