const httpStatusCodes = require('../httpStatusCodes');
const { ResponseMessages } = require('../constants');
const BaseError = require('../baseError');
const { ErrorMessages } = require('../../../auth-service/utils/constants');

class Api409Error extends BaseError {
  constructor(
    title = ErrorMessages.USER_EXISTS,
    statusCode = httpStatusCodes.CONFLICT,
    description = ResponseMessages.REGISTER_USER_FAILURE_EMAIL
  ) {
    super(title, statusCode, description);
  }
}

module.exports = Api409Error;
