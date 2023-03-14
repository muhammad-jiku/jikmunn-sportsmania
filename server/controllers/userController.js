// Register a User
const registerUser = (req, res, next) => {
  console.log('register a user');
};

// Login User
const loginUser = (req, res, next) => {
  console.log('login user');
};

// Logout User
const logout = (req, res, next) => {
  console.log('logout user');
};

// Forgot Password
const forgotPassword = (req, res, next) => {
  console.log('forgot password');
};

// Reset Password
const resetPassword = (req, res, next) => {
  console.log('reset password');
};

// Get User Detail
const getUserDetails = (req, res, next) => {
  console.log('get user details');
};

// update User password
const updatePassword = (req, res, next) => {
  console.log('update password');
};

// update User Profile
const updateProfile = (req, res, next) => {
  console.log('update profile');
};

// Get all users(admin)
const getAllUser = (req, res, next) => {
  console.log('get all users');
};

// Get single user (admin)
const getSingleUser = (req, res, next) => {
  console.log('get single user');
};

// update User Role -- Admin
const updateUserRole = (req, res, next) => {
  console.log('update user role');
};

// Delete User --Admin
const deleteUser = (req, res, next) => {
  console.log('delete user');
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
