const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
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
      return catchError(err, res);
    }
    req.email = decoded.id;
    next();
  });
};
module.exports = {
  verifyToken,
};
