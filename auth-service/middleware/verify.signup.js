const db = require('../schema');
const User = db.db.user;
const { ErrorMessages } = require('../utils/constants');
const Api409Error = require('../utils/errors/409');

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      throw new Api409Error();
    }
  } catch (err) {
    next(
      res.status(err.statusCode).send({
        title: ErrorMessages.USER_EXISTS,
        status: err.statusCode,
        error: err.description,
      })
    );
  }
  next();
};

module.exports = { checkDuplicateEmail };
