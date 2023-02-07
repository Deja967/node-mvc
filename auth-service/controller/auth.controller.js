const router = require('express').Router();
const AuthService = require('../service/auth.service');
const service = new AuthService();
// const { createRefreshToken } = require('../middleware/create.refresh.token');
const { checkDuplicateEmail } = require('../middleware/verify.signup');
const { RouteEndPoints, ErrorMessages } = require('../utils/constants');
const httpStatusCodes = require('../utils/httpStatusCodes');
const BaseError = require('../utils/baseError');
const { setCookie } = require('../middleware/cookie.auth');

router.post(
  RouteEndPoints.REGISTER_USER,
  // validation.signUpValidator,
  checkDuplicateEmail,
  async (req, res) => {
    console.log('body :', req);
    const { email, password } = req.body;
    console.log('email :', email);

    try {
      const response = await service.signUp({
        email,
        password,
      });
      res.status(httpStatusCodes.OK).send(response);
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.statusCode).send({
          title: 'Authorization Error',
          status: err.statusCode,
          error: err.description,
        });
      }
    }
  }
);

router.post(
  RouteEndPoints.LOGIN_USER,
  setCookie,
  // validation.signInValidator,
  async (req, res) => {
    const { email, password } = req.body;
    console.log('cookies :', cookies.jwt);
    try {
      const response = await service.loginUser({
        email,
        password,
      });
      // const refresh = await createRefreshToken(response.id);
      // const token = await setCookie(res, response.id);
      return res.status(httpStatusCodes.OK).send(response);
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.statusCode).send({
          title: ErrorMessages.AUTH_ERROR,
          status: err.statusCode,
          error: err.description,
        });
      }
    }
  }
);

module.exports = router;
