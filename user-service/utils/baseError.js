class BaseError extends Error {
  constructor(description, statusCode) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.description = description;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
