//  external import
const jwt = require('jsonwebtoken');
//  internal imports
const User = require('../../models/User');
const AsyncError = require('../bugError/AsyncError');
const ErrorHandler = require('../bugError/ErrorHandler');

//  Authentication
const isAuthenticatedUser = AsyncError(async (req, res, next) => {
  const authHeader = await req?.headers?.authorization;
  // console.log('Auth header........', authHeader);
  if (!authHeader) {
    // return next(new ErrorHandler('Please Login to access this resource', 401));
    return next(new ErrorHandler('Please Login to access this resource', 400));
  }
  const token = await authHeader?.split(' ')[1];
  // console.log('token.........', token);
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

//  Authorization
const authorizeAdmin = async (req, res, next) => {
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
};

// exporting modules
module.exports = {
  isAuthenticatedUser,
  authorizeAdmin,
};
