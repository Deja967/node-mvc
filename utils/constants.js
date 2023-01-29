// endpoints
const registerUser = '/api/register';
const loginUser = '/api/login';
const updateUserInfo = '/api/update-user';
const getFullUser = '/api/get-user';
const getAllUsers = '/api/get-users';

const refreshToken = '/api/refresh';

const addAddress = '/api/add-address';
const deleteAddress = '/api/delete-address';
const updateAddress = '/api/update-address';
//err
const err = 'Email or Password null';
const doesUserExist = 'user does not exist in database';
const updateUserSuccess = 'User updated successfully';
const doesAddressExist = 'Address does not exist in database';
const addressAddSuccess = 'Address(s) added successfully';
const addressDeleteSuccess = 'Address(s) deleted successfully';
const addressUpdateSuccess = 'Address(s) updated successfully';

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  updateUserInfo: updateUserInfo,
  updateUserSuccess: updateUserSuccess,
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
};
