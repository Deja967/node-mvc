const db = require('../schema');

const User = db.user;

const checkDuplicateEmail = async (req, res, next) => {
  const errMsg = 'this email already exist';
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    return res.status(409).send({ message: errMsg });
  }
};

module.exports = { checkDuplicateEmail };
