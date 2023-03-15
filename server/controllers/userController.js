const AsyncError = require('../middlewares/bugError/AsyncError');
const ErrorHandler = require('../middlewares/bugError/ErrorHandler');
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
const loginUser = AsyncError(async (req, res, next) => {
  const { email, password } = await req.body;

  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler('Please Enter Email & Password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    user,
    token,
  });
});

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
