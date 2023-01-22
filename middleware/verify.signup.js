const db = require('../schema');

const User = db.user;

const checkDuplicateEmail = async (req, res, next) => {
  const errMsg = 'this email already exist';
  await User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      return res.status(409).send({ message: errMsg });
    }
    next();
  });
};

module.exports = { checkDuplicateEmail };
