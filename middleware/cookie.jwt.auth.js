const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const util = require('util');

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res
      .status(401)
      .send({ Error: 'Unauthorized! Access Token has expired!' });
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
  });
};

module.exports = {
  verifyToken,
};
