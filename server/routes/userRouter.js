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

const userRouter = express.Router({
  caseSensitive: true,
});

userRouter.route('/register').post(registerUser);

userRouter.route('/login').post(loginUser);

userRouter.route('/logout').get(logout);

userRouter.route('/password/forgot').post(forgotPassword);

userRouter.route('/password/reset/:token').put(resetPassword);

userRouter.route('/me').get(getUserDetails);

userRouter.route('/password/update').put(updatePassword);

userRouter.route('/me/update').put(updateProfile);

userRouter.route('/admin/users').get(getAllUser);

userRouter
  .route('/admin/user/:id')
  .get(getSingleUser)
  .put(updateUserRole)
  .delete(deleteUser);

module.exports = userRouter;
