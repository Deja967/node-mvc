const router = require('express').Router();
const AuthService = require('../service/auth.service');
const service = new AuthService();
// const { createRefreshToken } = require('../middleware/create.refresh.token');
const { checkDuplicateEmail } = require('../middleware/verify.signup');
const { RouteEndPoints, ErrorMessages } = require('../utils/constants');
const httpStatusCodes = require('../utils/httpStatusCodes');
const BaseError = require('../utils/baseError');
const { setCookie } = require('../middleware/cookie.auth');
const userLoginResponse = require('../domain/login.user.response');

router.post(
  RouteEndPoints.REGISTER_USER,
  // validation.signUpValidator,
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
        console.log('err :', err);

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
  RouteEndPoints.LOGIN_USER,
  // validation.signInValidator,
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

router.post(RouteEndPoints.FORGOT_PASSWORD, async (req, res) => {
  const { email } = req.body;
  try {
    const response = await service.forgotPassword({
      email,
    });
    return res.status(httpStatusCodes.OK).send(response);
  } catch (err) {}
});
module.exports = router;
