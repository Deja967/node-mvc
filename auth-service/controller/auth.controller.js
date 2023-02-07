const router = require('express').Router();
const { createRefreshToken } = require('../middleware/create.refresh.token');

const { RouteEndPoints, ErrorMessages } = require('../utils/errorMessages');

router.post(
  //TODO: fix create user consecutively bug. cant create user more than once without resetting server
  RouteEndPoints.REGISTER_USER,
  validation.signUpValidator,
  checkDuplicateEmail,
  async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      date_of_birth,
      address,
      phone,
    } = req.body;
    try {
      const response = await service.signUp({
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        address,
        phone,
      });
      res.status(200).send(response);
    } catch (err) {
      console.log('controller error: ', err);

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
  validation.signInValidator,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await service.signIn({
        email,
        password,
        res,
      });
      const refresh = await createRefreshToken(response.id);
      const token = await setCookie(res, response.id);
      return res
        .status(httpStatusCodes.OK)
        .send(new userLoginResponse(response.email, token, refresh));
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
