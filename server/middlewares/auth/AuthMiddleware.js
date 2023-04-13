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
  // console.log(req.cookies);
  // console.log('---------------------');
  // console.log('---------------------');
  // console.log(req.headers);

  const authHeader = await req?.headers?.authorization;
  // console.log('Auth header........', authHeader);
  if (!authHeader) {
    // return next(new ErrorHandler('Please Login to access this resource', 401));
    return next(new ErrorHandler('Please Login to access this resource', 400));
  }
  const token = await authHeader?.split(' ')[1];
  // console.log('token.........', token);
  // console.log('secret.....', process.env.JWT_SECRET);
  if (!token) {
    // return next(new ErrorHandler('Please Login to access this resource', 401));
    return next(new ErrorHandler('Please Login to access this resource', 400));
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      // console.log(decoded);
      if (err) {
        // console.log(err);
        return next(new ErrorHandler('Access to this route is forbidden', 403));
      }
      req.decoded = decoded;
      // console.log('decoded: ', decoded);
      req.user = await User.findById(decoded.id);
      // console.log('user', req.user);

      next();
    });
  }
});

// const authorizeAdmin = (...roles) => {
const authorizeAdmin = async (req, res, next) => {
  // console.log(req.user);
  // const requestedEmail = req.decoded.email;
  // const requestedAccount = await User.findOne({
  //   email: requestedEmail,
  // });
  if (req.user?.role === 'admin') {
    next();
  } else {
    return next(
      new ErrorHandler(
        `Role: ${req.user.role} is not allowed to access this resouce `,
        403
      )
    );
  }

  // console.log('roles', roles);
  // return (req, res, next) => {
  //   console.log(req.user);
  //   console.log('role...', req.user.role);
  //   if (!roles.includes(req.user.role)) {
  //     return next(
  //       new ErrorHandler(
  //         `Role: ${req.user.role} is not allowed to access this resouce `,
  //         403
  //       )
  //     );
  //   }
  //   console.log('user');
  // next();
  // };
};

module.exports = {
  isAuthenticatedUser,
  authorizeAdmin,
};
