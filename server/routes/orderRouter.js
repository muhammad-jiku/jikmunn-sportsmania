const express = require('express');
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const { isAuthenticatedUser } = require('../middlewares/auth/AuthMiddleware');

const orderRouter = express.Router({
  caseSensitive: true,
});

orderRouter.route('/order/new').post(isAuthenticatedUser, newOrder);

orderRouter.route('/order/:id').get(getSingleOrder);

orderRouter.route('/orders/me').get(myOrders);

orderRouter.route('/admin/orders').get(getAllOrders);

orderRouter.route('/admin/order/:id').put(updateOrder).delete(deleteOrder);

module.exports = orderRouter;
