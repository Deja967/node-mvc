class BaseError extends Error {
  constructor(title, statusCode, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.title = title;
    this.statusCode = statusCode;
    this.description = description;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
