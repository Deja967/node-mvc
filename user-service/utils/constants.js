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
const err = 'Email or Password null';
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
};
