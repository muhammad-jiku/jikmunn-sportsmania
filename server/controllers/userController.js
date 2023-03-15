const AsyncError = require('../middlewares/bugError/AsyncError');
const User = require('../models/User');

// Register a User
const registerUser = AsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = await req.body;
  const { public_id } = await avatar;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id,
    },
  });
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    user,
    token,
  });
});
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
