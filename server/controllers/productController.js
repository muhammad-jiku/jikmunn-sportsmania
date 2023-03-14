// Create Product -- Admin
const createProduct = (req, res, next) => {
  console.log('create product');
};

// Get All Product
const getAllProducts = (req, res, next) => {
  console.log('get all products');
};

// Get Product Details
const getProductDetails = (req, res, next) => {
  console.log('product details');
};

// Update Product -- Admin
const updateProduct = (req, res, next) => {
  console.log('update product');
};

// Delete Product
const deleteProduct = (req, res, next) => {
  console.log('delete product');
};

// Create New Review or Update the review
const createProductReview = (req, res, next) => {
  console.log('create product review');
};

// Get All Reviews of a product
const getProductReviews = (req, res, next) => {
  console.log('product reviews');
};

// Delete Review
const deleteReview = (req, res, next) => {
  console.log('delete review');
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
