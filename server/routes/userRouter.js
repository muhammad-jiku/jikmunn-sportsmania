//  external import
const express = require('express');
//  internal imports
const {
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
} = require('../controllers/userController');
const {
  isAuthenticatedUser,
  authorizeAdmin,
} = require('../middlewares/auth/AuthMiddleware');

const userRouter = express.Router({
  caseSensitive: true,
});

userRouter.route('/register').post(registerUser);

userRouter.route('/login').post(loginUser);

userRouter.route('/logout').get(logout);

userRouter.route('/password/forgot').post(forgotPassword);

userRouter.route('/password/reset/:token').put(resetPassword);

userRouter.route('/password/update').put(isAuthenticatedUser, updatePassword);

userRouter.route('/me').get(isAuthenticatedUser, getUserDetails);

userRouter.route('/me/update').put(isAuthenticatedUser, updateProfile);

userRouter
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeAdmin, getAllUser);

userRouter
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeAdmin, getSingleUser)
  .put(isAuthenticatedUser, authorizeAdmin, updateUserRole)
  .delete(isAuthenticatedUser, authorizeAdmin, deleteUser);

//  exporing module
module.exports = userRouter;
