const express = require('express');
const constants = require('../utils/constants');
const router = express.Router();

const UserAddressService = require('../services/user.address.service');
const service = new UserAddressService();

router.post(constants.addAddress, async (req, res) => {
  const email = req.body.email;
  const address = req.body.address;
  const response = await service.addNewAddress(email, address);
  return res.sendStatus(200).status({
    response,
  });
});

module.exports = router;
