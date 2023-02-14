const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ErrorMessages } = require('../utils/constants');
const Api409Error = require('../utils/errors/409');

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      throw new Api409Error();
    }
  } catch (err) {
    next(
      res.status(err.code).send({
        title: err.title,
        status: err.code,
        error: err.description,
      })
    );
  }
  next();
};

module.exports = { checkDuplicateEmail };
