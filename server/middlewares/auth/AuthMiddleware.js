const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const AsyncError = require('../bugError/AsyncError');
const ErrorHandler = require('../bugError/ErrorHandler');

const isAuthenticatedUser = AsyncError(async (req, res, next) => {
  // const { token } = await req.cookies;
  // // console.log('token', token);
  // if (!token) {
  //  // return next(new ErrorHandler('Please Login to access this resource', 401));
  //   return next(new ErrorHandler('Please Login to access this resource', 400));
  // }

  // const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // // console.log('decoded data', decodedData);
  // req.user = await User.findById(decodedData.id);
  // // console.log('user', req.user);
  // next();

  const authHeader = req.headers.authorization;
  console.log('Auth header ', authHeader);
  if (!authHeader) {
    // return next(new ErrorHandler('Please Login to access this resource', 401));
    return next(new ErrorHandler('Please Login to access this resource', 400));
  }
  const token = authHeader.split(' ')[1];
  console.log(token);
  if (!token) {
    // return next(new ErrorHandler('Please Login to access this resource', 401));
    return next(new ErrorHandler('Please Login to access this resource', 400));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return next(new ErrorHandler('Access to this route is forbidden', 403));
    }
    req.decoded = decoded;
    console.log('decoded ', decoded);
    req.user = await User.findById(decoded.id);
    console.log('user', req.user);

    next();
  });
});

const authorizeRoles = (...roles) => {
  // console.log('roles', roles);
  return (req, res, next) => {
    console.log('role...', req.user.role);
    if (!roles.includes(req.user.role)) {
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
