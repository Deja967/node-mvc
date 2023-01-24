const express = require('express');
const { checkDuplicateEmail } = require('../middleware/verify.signup');
const validation = require('../middleware/validation');
const userService = require('../services/user.service');
const constants = require('../utils/constants');
// const auth = require('../middleware/jwtAuth');
const router = express.Router();
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

router.get(constants.getFullUser, async (req, res) => {
  const email = req.query.email;
  try {
    const response = await service.getAllUserInfo({
      email,
    });
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
