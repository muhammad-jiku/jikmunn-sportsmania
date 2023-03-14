// Create Product -- Admin
const createProduct = (req, res, next) => {
  res.send({
    message: 'create product',
  });
};

// Get All Product
const getAllProducts = (req, res, next) => {
  res.send({
    message: 'get all products',
  });
};

// Get Product Details
const getProductDetails = (req, res, next) => {
  res.send({
    message: 'product details',
  });
};

// Update Product -- Admin
const updateProduct = (req, res, next) => {
  res.send({
    message: 'update product',
  });
};

// Delete Product
const deleteProduct = (req, res, next) => {
  res.send({
    message: 'delete product',
  });
};

// Create New Review or Update the review
const createProductReview = (req, res, next) => {
  res.send({
    message: 'create product review',
  });
};

// Get All Reviews of a product
const getProductReviews = (req, res, next) => {
  res.send({
    message: 'product reviews',
  });
};

// Delete Review
const deleteReview = (req, res, next) => {
  res.send({
    message: 'delete review',
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
