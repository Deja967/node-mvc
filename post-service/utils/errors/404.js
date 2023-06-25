const httpStatusCodes = require('../httpStatusCodes');
const { ErrorMessages } = require('../constants');
const BaseError = require('../baseError');

class Api404Error extends BaseError {
  constructor(
    title = ErrorMessages.NOT_FOUND_ERROR,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = ErrorMessages.USER_NOT_FOUND
  ) {
    super(title, statusCode, description);
    this.description = description;
  }
}

module.exports = Api404Error;
