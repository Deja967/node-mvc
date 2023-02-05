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
  LOGIN_USER_FAILED: 'Email or password is incorrect',
};

// endpoints
const registerUser = '/api/register';
const loginUser = '/api/login';
const deleteUser = '/api/delete-user';
const updateUserInfo = '/api/update-user';
const getFullUser = '/api/get-user';
const getAllUsers = '/api/get-users';

const refreshToken = '/api/refresh';

const addAddress = '/api/add-address';
const deleteAddress = '/api/delete-address';
const updateAddress = '/api/update-address';
//err
const err = 'Email or Password incorrect';
const doesUserExist = 'User does not exist in database';
const updateUserSuccess = 'User updated successfully';
const deleteUserSuccess = 'User deleted successfully';
const doesAddressExist = 'Address does not exist in database';
const addressAddSuccess = 'Address(s) added successfully';
const addressDeleteSuccess = 'Address(s) deleted successfully';
const addressUpdateSuccess = 'Address(s) updated successfully';

const nodeDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  deleteUser: deleteUser,

  updateUserInfo: updateUserInfo,
  updateUserSuccess: updateUserSuccess,
  deleteUserSuccess: deleteUserSuccess,
  getFullUser: getFullUser,
  getAllUsers: getAllUsers,
  doesUserExist: doesUserExist,
  doesAddressExist: doesAddressExist,
  addressAddSuccess: addressAddSuccess,
  addressDeleteSuccess: addressDeleteSuccess,
  addressUpdateSuccess: addressUpdateSuccess,
  addAddress: addAddress,
  deleteAddress: deleteAddress,
  updateAddress: updateAddress,
  refreshToken: refreshToken,
  err: err,
  nodeDate: nodeDate,
  RouteEndPoints,
  ResponseMessages,
};
