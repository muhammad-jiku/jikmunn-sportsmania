const AsyncError = require('../middlewares/bugError/AsyncError');
const ErrorHandler = require('../middlewares/bugError/ErrorHandler');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/sendToken');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a User
const registerUser = AsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = await req.body;

  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
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
    // return next(new ErrorHandler('Invalid email or password', 401));
    return next(new ErrorHandler('Invalid email or password', 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    // return next(new ErrorHandler('Invalid email or password', 401));
    return next(new ErrorHandler('Invalid email or password', 400));
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
  // res.header('Access-Control-Allow-Origin', '*');
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

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/password/reset/${resetToken}`;

  const resetPasswordUrl = `${process.env.CLIENT_URI}/password/reset/${resetToken}`;

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
  const { password, passwordConfirm } = await req.body;

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

  if (password !== passwordConfirm) {
    return next(new ErrorHandler('Password does not password', 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
const getUserDetails = AsyncError(async (req, res, next) => {
  const { id } = await req.user;
  // console.log(req.user);
  const user = await User.findById({
    _id: id,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
const updatePassword = AsyncError(async (req, res, next) => {
  const { id } = await req.user;
  const { oldPassword, newPassword, passwordConfirm } = await req.body;

  const user = await User.findById({ _id: id }).select('+password');

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  if (newPassword !== passwordConfirm) {
    return next(new ErrorHandler('Password does not match', 400));
  }
  user.password = newPassword;

  await user.save();
  sendToken(user, 200, res);
});

// update User Profile
const updateProfile = AsyncError(async (req, res, next) => {
  const { id } = await req.user;
  // const { name, email, avatar } = await req.body;
  // // const { public_id, url } = await avatar;
  // const newUserData = {
  //   name,
  //   email,
  // };

  const { name, phone, address, avatar } = await req.body;

  const updatedUserData = {
    name,
    avatar,
    phone,
    address,
  };

  const opts = {
    runValidators: true,
    new: true,
  };

  if (avatar !== '') {
    const user = await User.findById({ _id: id });

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    updatedUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(
    { _id: id },
    // { $set: newUserData },
    { $set: updatedUserData },
    {
      opts,
    }
  ).exec();

  res.status(200).json({
    success: true,
    user,
    // newUserData,
    updatedUserData,
  });
});

// Get all users  - (admin)
const getAllUser = AsyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user  - (admin)
const getSingleUser = AsyncError(async (req, res, next) => {
  const { id } = await req.params;
  const user = await User.findById({ _id: id });

  if (!user) {
    return next(new ErrorHandler(`User does not exist with Id: ${id}`));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role  - (admin)
const updateUserRole = AsyncError(async (req, res, next) => {
  const { id } = await req.params;
  const { name, email, role } = await req.body;
  const newUserData = {
    name,
    email,
    role,
  };
  const opts = {
    runValidators: true,
    new: true,
  };

  await User.findByIdAndUpdate(
    { _id: id },
    { $set: newUserData },
    {
      opts,
    }
  ).exec();

  res.status(200).json({
    success: true,
    newUserData,
  });
});

// Delete User  - (admin)
const deleteUser = AsyncError(async (req, res, next) => {
  const { id } = await req.params;
  const user = await User.findById({ _id: id });

  if (!user) {
    return next(new ErrorHandler(`User does not exist with Id: ${id}`, 400));
  } else {
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    await User.deleteOne({ _id: id });
  }

  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
  });
});

//  exporting modules
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
