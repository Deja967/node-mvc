class BaseError extends Error {
  constructor(title, code, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.title = title;
    this.code = code;
    this.description = description;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
