// Register a User
const registerUser = (req, res, next) => {
  res.send({
    message: 'register a user',
  });
};

// Login User
const loginUser = (req, res, next) => {
  res.send({
    message: 'login user',
  });
};

// Logout User
const logout = (req, res, next) => {
  res.send({
    message: 'logout user',
  });
};

// Forgot Password
const forgotPassword = (req, res, next) => {
  res.send({
    message: 'forgot password',
  });
};

// Reset Password
const resetPassword = (req, res, next) => {
  res.send({
    message: 'reset password',
  });
};

// Get User Detail
const getUserDetails = (req, res, next) => {
  res.send({
    message: 'get user details',
  });
};

// update User password
const updatePassword = (req, res, next) => {
  res.send({
    message: 'update password',
  });
};

// update User Profile
const updateProfile = (req, res, next) => {
  res.send({
    message: 'update profile',
  });
};

// Get all users(admin)
const getAllUser = (req, res, next) => {
  res.send({
    message: 'get all users',
  });
};

// Get single user (admin)
const getSingleUser = (req, res, next) => {
  res.send({
    message: 'get single user',
  });
};

// update User Role -- Admin
const updateUserRole = (req, res, next) => {
  res.send({
    message: 'update user role',
  });
};

// Delete User --Admin
const deleteUser = (req, res, next) => {
  res.send({
    message: 'delete user',
  });
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
