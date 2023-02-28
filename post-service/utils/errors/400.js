const httpStatusCodes = require('../httpStatusCodes');
const { ResponseMessages, ErrorMessages } = require('../constants');
const BaseError = require('../baseError');
class Api400Error extends BaseError {
  constructor(
    title = ErrorMessages.BAD_REQUEST,
    code = httpStatusCodes.BAD_REQUEST,
    description = ResponseMessages.LOGIN_USER_FAILED
  ) {
    super(title, code, description);
  }
}

module.exports = Api400Error;
