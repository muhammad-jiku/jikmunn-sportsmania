//  internal imports
const Order = require('../models/Order');
const Product = require('../models/Product');
const AsyncError = require('../middlewares/bugError/AsyncError');
const ErrorHandler = require('../middlewares/bugError/ErrorHandler');

// Create New Order
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

// Get Single Order
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

// Get logged in user Orders
const myOrders = AsyncError(async (req, res, next) => {
  const { _id } = await req.user;
  const orders = await Order.find({ user: _id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all Orders - (admin)
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

//  Update order's item stock
const updateStock = async (id, quantity) => {
  const product = await Product.findById({ _id: id });
  product.stock -= quantity;

  await product.save({
    validateBeforeSave: false,
  });
};

// Update Order Status- (admin)
const updateOrder = AsyncError(async (req, res, next) => {
  const { id } = await req.params;
  const { status } = await req.body;
  const order = await Order.findById({ _id: id });

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }

  if (status === 'Shipped') {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = status;

  if (status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  const updatedOrder = await order.save({
    validateBeforeSave: false,
  });
  res.status(200).json({
    success: true,
    order,
    updatedOrder,
  });
});

// Delete Order - (admin)
const deleteOrder = AsyncError(async (req, res, next) => {
  const { id } = await req.params;
  const order = await Order.findById({ _id: id });

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  } else {
    await Order.deleteOne({ _id: id });
  }

  res.status(200).json({
    success: true,
    message: 'Order Delete Successfully',
  });
});

// exporting modules
module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
