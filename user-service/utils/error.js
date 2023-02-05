const httpStatusCodes = require('../utils/httpStatusCodes');
const { ResponseMessages } = require('../utils/constants');
const BaseError = require('../utils/baseError');

class Api401Error extends BaseError {
  constructor(
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = ResponseMessages.LOGIN_USER_FAILED
  ) {
    super(description, statusCode);
  }
}

module.exports = Api401Error;
