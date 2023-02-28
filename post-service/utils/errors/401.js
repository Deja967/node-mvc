const httpStatusCodes = require('../httpStatusCodes');
const { ResponseMessages, ErrorMessages } = require('../constants');
const BaseError = require('../baseError');
class Api401Error extends BaseError {
  constructor(
    title = ErrorMessages.AUTH_ERROR,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = ResponseMessages.LOGIN_USER_FAILED
  ) {
    super(title, statusCode, description);
  }
}

module.exports = Api401Error;
