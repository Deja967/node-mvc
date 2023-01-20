const express = require('express');
const userService = require('../services/user.service');
// const auth = require('../middleware/jwtAuth');
const router = express.Router();
const service = new userService();

router.post('/api/register', async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      date_of_birth,
      address,
      phone,
    } = req.body;

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
});

module.exports = router;
