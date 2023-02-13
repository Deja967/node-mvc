const router = require('express').Router();
const AuthService = require('../service/auth.service');
const service = new AuthService();
const { checkDuplicateEmail } = require('../middleware/verify.signup');
const { RouteEndPoints, ErrorMessages } = require('../utils/constants');
const httpStatusCodes = require('../utils/httpStatusCodes');
const BaseError = require('../utils/baseError');
const { setCookie } = require('../middleware/cookie.auth');
const userLoginResponse = require('../domain/login.user.response');
const { verifyRefreshToken } = require('../middleware/verify.refresh.token');
const {
  validateSignUp,
  validateLogin,
  validateUpdatePassword,
} = require('../middleware/validation');

router.post(
  RouteEndPoints.REGISTER_USER,
  validateSignUp,
  checkDuplicateEmail,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await service.signUp({
        email,
        password,
      });
      res.status(httpStatusCodes.OK).send(response);
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.statusCode).send({
          title: err.title,
          status: err.statusCode,
          error: err.description,
        });
      }
    }
  }
);

router.post(
  //todo: add last login
  RouteEndPoints.LOGIN_USER,
  validateLogin,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await service.loginUser({
        email,
        password,
      });
      const token = await setCookie(res, response.id);
      return res
        .status(httpStatusCodes.OK)
        .send(new userLoginResponse(response.email, token, response.refresh));
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.statusCode).send({
          title: err.title,
          status: err.statusCode,
          error: err.description,
        });
      }
    }
  }
);

router.get(
  RouteEndPoints.REFRESH_TOKEN,
  verifyRefreshToken,
  async (req, res) => {
    const refresh_token = req.headers.authorization.split(' ')[1];
    try {
      const response = await service.refreshToken(refresh_token);
      return res.status(httpStatusCodes.OK).send(response);
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.statusCode).send({
          title: err.title,
          status: err.statusCode,
          error: err.description,
        });
      }
    }
  }
);

router.post(RouteEndPoints.FORGOT_PASSWORD, async (req, res) => {
  const { email } = req.body;
  try {
    const response = await service.forgotPassword({
      email,
    });
    return res.status(httpStatusCodes.OK).send(response);
  } catch (err) {}
});

router.post(
  RouteEndPoints.RESET_PASSWORD,
  validateUpdatePassword,
  async (req, res) => {
    const { token, password } = req.body;
    try {
      const response = await service.resetPassword(token, password);
      console.log(response);
      return res.status(httpStatusCodes.OK).send({ response });
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.code).send({
          title: err.title,
          status: err.code,
          error: err.description,
        });
      }
    }
  }
);
module.exports = router;
