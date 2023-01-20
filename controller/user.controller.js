const express = require('express');
const userService = require('../service/user.service');
// const auth = require('../middleware/jwtAuth');
const router = express.Router();
const service = new userService();

router.post('/api/register', async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, date_of_birth, phone } =
      req.body;
    const { address } = req.body.address;
    console.log(address);
    await service
      .signUp({
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        phone,
      })
      .then((user) => {
        res.status(200).send({
          registered: true,
          message: 'Sign up successful',
          id: user.id,
          email: user.email,
        });
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
