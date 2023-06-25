const express = require('express');
const router = express.Router();
const constants = require('../utils/constants');
const { verifyToken } = require('../middleware/cookie.jwt.auth');

const UserAddressService = require('../services/user.address.service');
const { RouteEndPoints } = require('../utils/constants');
const BaseError = require('../utils/baseError');
const httpStatusCodes = require('../utils/httpStatusCodes');
const service = new UserAddressService();

router.post(RouteEndPoints.ADD_ADDRESS, verifyToken, async (req, res) => {
  const email = req.body.email;
  const address = req.body.address;
  try {
    const response = await service.addNewAddress(email, address);
    return res.status(httpStatusCodes.OK).send({ message: response });
  } catch (err) {
    if (err instanceof BaseError) {
      res.status(err.statusCode).send({
        title: err.title,
        status: err.statusCode,
        error: err.description,
      });
    }
  }
});

router.put(
  RouteEndPoints.UPDATE_USER_ADDRESS,
  verifyToken,
  async (req, res) => {
    const email = req.body.email;
    const address = req.body.address;
    try {
      const response = await service.updateAddress(email, address);
      return res.status(httpStatusCodes.OK).send({ message: response });
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.statusCode).send({
          title: err.title,
          status: err.statusCode,
          error: err.description,
        });
      }
    }
  }
);

router.delete(
  RouteEndPoints.DELETE_USER_ADDRESS,
  verifyToken,
  async (req, res) => {
    const email = req.body.email;
    const addressId = req.body.address_id;
    try {
      const response = await service.deleteAddress(email, addressId);
      return res.status(httpStatusCodes.OK).send({ message: response });
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.statusCode).send({
          title: err.title,
          status: err.statusCode,
          error: err.description,
        });
      }
    }
  }
);

module.exports = router;
