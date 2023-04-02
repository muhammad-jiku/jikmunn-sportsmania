const express = require('express');
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
  authorizeRoles,
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
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

userRouter
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = userRouter;
