const RouteEndPoints = {
  REGISTER_USER: '/api/register',
  LOGIN_USER: '/api/login',
  DELETE_USER: '/api/delete-user',
  UPDATE_USER: '/api/update-user',
  GET_USER: '/api/get-user',
  GET_USERS: '/api/get-users',

  ADD_ADDRESS: '/api/add-address',
  UPDATE_USER_ADDRESS: '/api/delete-address',
  DELETE_USER_ADDRESS: '/api/update-address',

  REFRESH_TOKEN: '/api/refresh',
};

const ResponseMessages = {
  REGISTER_USER_SUCCESS: 'User registered successfully',
  LOGIN_USER_SUCCESS: 'User logged in successfully',
  DELETE_USER_SUCCESS: 'User deleted successfully',
  UPDATE_USER_SUCCESS: 'User updated successfully',
  GET_USER_SUCCESS: 'User retrieved successfully',
  ADDRESS_ADDED_SUCCESS: 'Address added successfully',
  ADDRESS_UPDATED_SUCCESS: 'Address(s) updated successfully',
  ADDRESS_DELETED_SUCCESS: 'Address(s) deleted successfully',
  REGISTER_USER_FAILURE_EMAIL: 'This email is already in use',

  LOGIN_USER_FAILED: 'Email or password is incorrect',
};

const ErrorMessages = {
  AUTH_ERROR: 'Authorization Error',
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'No user found with this email',
};

const nodeDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
module.exports = {
  nodeDate: nodeDate,
  RouteEndPoints,
  ResponseMessages,
  ErrorMessages,
};
