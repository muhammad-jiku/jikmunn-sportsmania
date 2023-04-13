const express = require('express');
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const {
  isAuthenticatedUser,
  authorizeAdmin,
} = require('../middlewares/auth/AuthMiddleware');

const orderRouter = express.Router({
  caseSensitive: true,
});

orderRouter.route('/order/new').post(isAuthenticatedUser, newOrder);

orderRouter.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

orderRouter.route('/orders/me').get(isAuthenticatedUser, myOrders);

orderRouter
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizeAdmin, getAllOrders);

orderRouter
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeAdmin, updateOrder)
  .delete(isAuthenticatedUser, authorizeAdmin, deleteOrder);

module.exports = orderRouter;
