// Create new Order
const newOrder = (req, res, next) => {
  console.log('new order');
};

// get Single Order
const getSingleOrder = (req, res, next) => {
  console.log('get single order');
};

// get logged in user  Orders
const myOrders = (req, res, next) => {
  console.log('my orders');
};

// get all Orders -- Admin
const getAllOrders = (req, res, next) => {
  console.log('get all oreders');
};

// update Order Status -- Admin
const updateOrder = (req, res, next) => {
  console.log('update order');
};

const updateStock = (id, quantity) => {
  console.log('update stock');
};

// delete Order -- Admin
const deleteOrder = (req, res, next) => {
  console.log('delete order');
};

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
