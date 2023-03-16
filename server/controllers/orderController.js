const AsyncError = require('../middlewares/bugError/AsyncError');
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
const getSingleOrder = (req, res, next) => {
  res.send({
    message: 'get single order',
  });
};

// get logged in user  Orders
const myOrders = (req, res, next) => {
  res.send({
    message: 'my orders',
  });
};

// get all Orders -- Admin
const getAllOrders = (req, res, next) => {
  res.send({
    message: 'get all oreders',
  });
};

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
