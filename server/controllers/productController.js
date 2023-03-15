const Product = require('../models/Product');

// Create Product -- Admin
const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// Get All Product
const getAllProducts = (req, res, next) => {
  res.send({
    message: 'get all products',
  });
};

// Get All Product (Admin)
const getAdminProducts = async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    products,
  });
};

// Get Product Details
const getProductDetails = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById({ _id: id });

  res.status(200).json({
    success: true,
    product,
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
  getAdminProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
