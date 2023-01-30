const express = require('express');
const router = express.Router();
const constants = require('../utils/constants');
const { verifyToken } = require('../middleware/cookie.jwt.auth');

const UserAddressService = require('../services/user.address.service');
const service = new UserAddressService();

router.post(constants.addAddress, verifyToken, async (req, res) => {
  const email = req.body.email;
  const address = req.body.address;
  try {
    const response = await service.addNewAddress(email, address);
    console.log(response);
    return res.status(200).send({ message: response });
  } catch (err) {
    console.log(err);
  }
});

router.put(constants.updateAddress, verifyToken, async (req, res) => {
  const email = req.body.email;
  const address = req.body.address;
  try {
    const response = await service.updateAddress(email, address);
    return res.status(200).send({ message: response });
  } catch (err) {
    console.log(err);
  }
});

router.delete(constants.deleteAddress, verifyToken, async (req, res) => {
  const email = req.body.email;
  const addressId = req.body.address_id;
  try {
    const response = await service.deleteAddress(email, addressId);
    return res.status(200).send({ message: response });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
