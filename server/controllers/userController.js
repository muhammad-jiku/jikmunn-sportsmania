const AsyncError = require('../middlewares/bugError/AsyncError');
const ErrorHandler = require('../middlewares/bugError/ErrorHandler');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/sendToken');
const crypto = require('crypto');

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
  sendToken(user, 201, res);
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
  sendToken(user, 200, res);
});

// Logout User
const logout = AsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

// Forgot Password
const forgotPassword = AsyncError(async (req, res, next) => {
  const { email } = await req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // Get ResetPassword Token
  const resetToken = await user.getResetPasswordToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Sports Mania Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
const resetPassword = AsyncError(async (req, res, next) => {
  const { token } = await req.params;
  const { password, confirmPassword } = await req.body;
  console.log(token, password, confirmPassword);
  // creating token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Reset Password Token is invalid or has been expired',
        400
      )
    );
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler('Password does not password', 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

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
