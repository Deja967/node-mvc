const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
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
      password: joiPassword
        .string()
        .min(8)
        .max(15)
        .minOfSpecialCharacters(3)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .noWhiteSpaces()
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
    next();
  } catch (err) {
    throw err;
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

const validateUpdatePassword = (req, res, next) => {
  try {
    const schema = Joi.object({
      token: Joi.string().required(),
      password: joiPassword
        .string()
        .min(8)
        .max(15)
        .minOfSpecialCharacters(3)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .noWhiteSpaces()
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
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { validateSignUp, validateLogin, validateUpdatePassword };
