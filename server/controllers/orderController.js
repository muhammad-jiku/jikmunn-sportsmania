const AsyncError = require('../middlewares/bugError/AsyncError');
const ErrorHandler = require('../middlewares/bugError/ErrorHandler');
const Order = require('../models/Order');

// Create new Order
const newOrder = AsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = await req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
const getSingleOrder = AsyncError(async (req, res, next) => {
  const { id } = await req.params;
  const order = await Order.findById({ _id: id }).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
const myOrders = AsyncError(async (req, res, next) => {
  const { _id } = await req.user;
  const orders = await Order.find({ user: _id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
const getAllOrders = AsyncError(async (req, res, next) => {
  const orders = await Order.find({});

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
const updateOrder = (req, res, next) => {
  res.send({
    message: 'update order',
  });
};

const updateStock = (id, quantity) => {
  res.send({
    message: 'update stock',
  });
};

// delete Order -- Admin
const deleteOrder = (req, res, next) => {
  res.send({
    message: 'delete order',
  });
};

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
