const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { deleteIfExpired } = require('../utils/create.refresh.token');

const catchError = async (err, res, token) => {
  try {
    const deleteError = await deleteIfExpired(token);
    if (deleteError) {
      return res.status(deleteError.statusCode).send({
        title: deleteError.title,
        statusCode: deleteError.statusCode,
        description: deleteError.description,
      });
    }
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        message:
          'Unauthorized! Refresh Token has expired! Please make a new login request',
      });
    }
  } catch (err) {
    throw err;
  }
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

  jwt.verify(token, config.refreshTokenSecret, async (err, decoded) => {
    if (err) {
      return catchError(err, res, token);
    }
    next();
  });
};
module.exports = {
  verifyRefreshToken,
};
