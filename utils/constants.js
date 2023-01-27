// endpoints
const registerUser = '/api/register';
const loginUser = '/api/login';
const getFullUser = '/api/get-user';
const getAllUsers = '/api/get-users';

const refreshToken = '/api/refresh';

const addAddress = '/api/add-address';
//err
const err = 'Email or Password null';
const doesUserExist = 'No user found';

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  getFullUser: getFullUser,
  getAllUsers: getAllUsers,
  doesUserExist: doesUserExist,
  addAddress: addAddress,
  refreshToken: refreshToken,
  err: err,
};
