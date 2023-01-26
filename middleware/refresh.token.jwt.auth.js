const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const util = require('util');
// const { TokenExpiredError } = require('jsonwebtoken');

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res
      .status(401)
      .send({ message: 'Unauthorized! Refresh Token has expired!' });
  }
  return res.sendStatus(401).send({ message: 'Unauthorized!' });
};

const verifyRefreshToken = (req, res, next) => {
  const authHeader =
    req.body.token || req.query.token || req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.Status(401).send({
      message: 'Unauthorized',
    });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.refreshTokenSecret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    next();
  });
};
module.exports = {
  verifyRefreshToken,
};
