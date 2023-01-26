const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
// const { TokenExpiredError } = require('jsonwebtoken');

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res
      .status(401)
      .send({ message: 'Unauthorized! Access Token has expired!' });
  }
  return res.sendStatus(401).send({ message: 'Unauthorized!' });
};
const verifyToken = (req, res, next) => {
  //403 unauthorized
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return res.status(403).send({
      message: 'No token provided',
    });
  }

  jwt.verify(cookie, config.accessTokenSecret, (err, decoded) => {
    if (err) {
      catchError(err, res);
    }
    req.email = decoded.id;
    next();
  });
};

const verifyRefreshToken = (req, res, next) => {
  console.log('req :', req.headers.authorization);
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
    req.email = decoded.id;
    next();
  });
};
module.exports = {
  verifyToken,
  verifyRefreshToken,
};
