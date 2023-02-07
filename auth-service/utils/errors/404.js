const httpStatusCodes = require('../httpStatusCodes');
const { ErrorMessages } = require('../constants');
const BaseError = require('../baseError');

class Api404Error extends BaseError {
  constructor(
    statusCode = httpStatusCodes.NOT_FOUND,
    description = ErrorMessages.USER_NOT_FOUND
  ) {
    super(description, statusCode);
  }
}

module.exports = Api404Error;
