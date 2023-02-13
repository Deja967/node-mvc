const express = require('express');
const { checkDuplicateEmail } = require('../middleware/verify.signup');
const { setCookie } = require('../middleware/cookie.auth');
const { verifyToken } = require('../middleware/cookie.jwt.auth');
const { RouteEndPoints, ErrorMessages } = require('../utils/constants');
const router = express.Router();
const userService = require('../services/user.service');
const service = new userService();
const BaseError = require('../utils/baseError');
const httpStatusCodes = require('../utils/httpStatusCodes');

router.get(RouteEndPoints.GET_USER, verifyToken, async (req, res) => {
  const email = req.query.email;
  try {
    const response = await service.getAllUserInfo({
      email,
    });
    res.status(httpStatusCodes.OK).send(response);
  } catch (err) {
    if (err instanceof BaseError) {
      res.status(err.statusCode).send({
        title: 'Not Found',
        status: err.statusCode,
        error: err.description,
      });
    }
  }
});

router.get(RouteEndPoints.GET_USERS, async (req, res) => {
  try {
    const response = await service.getAllUsers();
    //might cause issues on the front end with how its sent back and getting back specific data
    // console.log(
    //   response.map((user) => console.log(user.first_name, user.last_name))
    // );
    return res.status(httpStatusCodes.OK).send(response);
  } catch (err) {
    console.log(err);
  }
});

router.put(RouteEndPoints.UPDATE_USER, verifyToken, async (req, res) => {
  const { first_name, last_name, email, date_of_birth, phone } = req.body;
  try {
    const response = await service.updateUser(
      first_name,
      last_name,
      email,
      date_of_birth,
      phone
    );
    return res.status(httpStatusCodes.OK).send({ message: response });
  } catch (err) {
    if (err instanceof BaseError) {
      res.status(err.statusCode).send({
        title: 'Not Found',
        status: err.statusCode,
        error: err.description,
      });
    }
  }
});

router.delete(RouteEndPoints.DELETE_USER, verifyToken, async (req, res) => {
  const email = req.body.email;
  try {
    const response = await service.deleteUser(email);
    return res.status(httpStatusCodes.OK).send({ message: response });
  } catch (err) {
    if (err instanceof BaseError) {
      res.status(err.statusCode).send({
        title: 'Not Found',
        status: err.statusCode,
        error: err.description,
      });
    }
  }
});

module.exports = router;
