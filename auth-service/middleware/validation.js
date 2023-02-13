const Joi = require('joi');
const { ErrorMessages } = require('../utils/constants');
const Api400Error = require('../utils/errors/400');
const httpStatusCodes = require('../utils/httpStatusCodes');

const validateSignUp = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string()
        .min(10)
        .max(15)
        //needs at least 1 special character
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'password'
        )
        //underscore not valid in password
        .invalid('_')
        .required(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map((x) => ({ message: x.message }));
      next(
        res
          .status(httpStatusCodes.BAD_REQUEST)
          .send(
            new Api400Error(
              ErrorMessages.BAD_REQUEST,
              httpStatusCodes.BAD_REQUEST,
              message
            )
          )
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const validateLogin = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'org'] },
        })
        .required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map((x) => ({ message: x.message }));
      next(
        res
          .status(httpStatusCodes.BAD_REQUEST)
          .send(
            new Api400Error(
              ErrorMessages.BAD_REQUEST,
              httpStatusCodes.BAD_REQUEST,
              message
            )
          )
      );
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { validateSignUp, validateLogin };
