const express = require('express');
const { checkDuplicateEmail } = require('../middleware/verify.signup');
const { createRefreshToken } = require('../middleware/create.refresh.token');
const { setCookie } = require('../middleware/cookie.auth');
const { verifyToken } = require('../middleware/cookie.jwt.auth');
const validation = require('../middleware/validation');
const constants = require('../utils/constants');
const router = express.Router();
const userLoginResponse = require('../domain/login.user.response');
const userService = require('../services/user.service');
const service = new userService();

router.post(
  constants.registerUser,
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
      console.log(err);
    }
  }
);

router.post(
  constants.loginUser,
  validation.signInValidator,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await service.signIn({
        email,
        password,
        res,
      });
      if (response == constants.err) {
        return res.status(401).send({
          message: 'Incorrect Email or Password',
        });
      }
      console.log('id :', response.dataValues.id);
      const refresh = await createRefreshToken(response.dataValues.id);
      //save response var in hidden val later
      const token = await setCookie(res, response.dataValues.id);
      return res
        .status(200)
        .send(new userLoginResponse(response.dataValues.email, token, refresh));
    } catch (err) {
      console.log(err);
    }
  }
);

router.get(constants.getFullUser, verifyToken, async (req, res) => {
  const email = req.query.email;
  try {
    const response = await service.getAllUserInfo({
      email,
    });
    if (response == constants.doesUserExist) {
      res.status(404).send({ message: "User doesn't exist" });
    } else {
      res.status(200).send(response);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get(constants.getAllUsers, async (req, res) => {
  try {
    const response = await service.getAllUsers();
    //might cause issues on the front end with how its sent back and getting back specific data
    // console.log(
    //   response.map((user) => console.log(user.first_name, user.last_name))
    // );
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
});

router.put(constants.updateUserInfo, verifyToken, async (req, res) => {
  const { first_name, last_name, email, date_of_birth, phone } = req.body;
  try {
    const response = await service.updateUser(
      first_name,
      last_name,
      email,
      date_of_birth,
      phone
    );
    return res.status(200).send({ message: response });
  } catch (err) {
    console.log(err);
  }
});

router.delete(constants.deleteUser, verifyToken, async (req, res) => {
  const email = req.body.email;
  try {
    const response = await service.deleteUser(email);
    return res.status(200).send({ message: response });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
