const router = require('express').Router();
const constants = require('../utils/constants');
const {
  createForgotPasswordToken,
} = require('../middleware/create.forgot.password.token');
const ForgotPasswordService = require('../services/forgot.password.service');
const service = new ForgotPasswordService();

router.post('/api/forgot-password', async (req, res) => {
  try {
    const email = req.body.email;
    const response = await service.forgotPassword(email);

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.post('/api/reset-password', async (req, res) => {
  try {
    const email = req.body.email;
    const response = await service.forgotPassword(email);
    res.status(200).json({ message: response });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
