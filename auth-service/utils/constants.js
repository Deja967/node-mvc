const RouteEndPoints = {
  REGISTER_USER: '/api/register',
  LOGIN_USER: '/api/login',

  REFRESH_TOKEN: '/api/refresh',
  FORGOT_PASSWORD: '/api/forgot-password',
  RESET_PASSWORD: '/api/reset-password',
};

const ResponseMessages = {
  REGISTER_USER_SUCCESS: 'User registered successfully',
  LOGIN_USER_SUCCESS: 'User logged in successfully',
  LOGIN_USER_FAILED: 'Email or password is incorrect',
};

const ErrorMessages = {
  AUTH_ERROR: 'Authorization Error',
  EXIST_ERROR: 'Already Exist',
  NOT_FOUND_ERROR: 'Not Found',
  USER_EXISTS: 'User with this email already exists',
  USER_NOT_FOUND: 'No user found with this email',
};

const nodeDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
module.exports = {
  nodeDate: nodeDate,
  RouteEndPoints,
  ResponseMessages,
  ErrorMessages,
};
