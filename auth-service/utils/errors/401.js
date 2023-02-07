const httpStatusCodes = require('../httpStatusCodes');
const { ResponseMessages } = require('../constants');
const BaseError = require('../baseError');

class Api401Error extends BaseError {
  constructor(
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = ResponseMessages.LOGIN_USER_FAILED
  ) {
    super(description, statusCode);
  }
}

module.exports = Api401Error;
