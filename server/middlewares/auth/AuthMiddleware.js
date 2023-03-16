const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const AsyncError = require('../bugError/AsyncError');
const ErrorHandler = require('../bugError/ErrorHandler');

const isAuthenticatedUser = AsyncError(async (req, res, next) => {
  const { token } = await req.cookies;
  console.log('token', token); 
  if (!token) {
    return next(new ErrorHandler('Please Login to access this resource', 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log('decoded data', decodedData);
  req.user = await User.findById(decodedData.id);
  console.log('user', req.user);
  next();
});

const authorizeRoles = (...roles) => {
  console.log('roles', roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log('role...', req.user.role);
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

module.exports = {
  isAuthenticatedUser,
  authorizeRoles,
};
