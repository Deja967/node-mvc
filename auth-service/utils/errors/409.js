const httpStatusCodes = require('../httpStatusCodes');
const { ResponseMessages } = require('../constants');
const BaseError = require('../baseError');

class Api409Error extends BaseError {
  constructor(
    statusCode = httpStatusCodes.CONFLICT,
    description = ResponseMessages.REGISTER_USER_FAILURE_EMAIL
  ) {
    super(description, statusCode);
  }
}

module.exports = Api409Error;
