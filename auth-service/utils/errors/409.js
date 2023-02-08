const httpStatusCodes = require('../httpStatusCodes');
const { ErrorMessages } = require('../constants');
const BaseError = require('../baseError');

class Api409Error extends BaseError {
  constructor(
    title = ErrorMessages.EXIST_ERROR,
    statusCode = httpStatusCodes.CONFLICT,
    description = ErrorMessages.USER_EXISTS
  ) {
    super(title, statusCode, description);
  }
}

module.exports = Api409Error;
