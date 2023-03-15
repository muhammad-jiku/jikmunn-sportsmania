const AsyncError = require('../middlewares/bugError/AsyncError');
const ErrorHandler = require('../middlewares/bugError/ErrorHandler');
const Product = require('../models/Product');

// Create Product -- Admin
const createProduct = AsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product
const getAllProducts = (req, res, next) => {
  res.send({
    message: 'get all products',
  });
};

// Get All Product (Admin)
const getAdminProducts = AsyncError(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
const getProductDetails = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById({ _id: id });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// Update Product -- Admin
const updateProduct = AsyncError(async (req, res, next) => {
  const id = req.params.id;
  const updatedProductInfo = req.body;
  const opts = {
    runValidators: true,
    new: true,
  };

  let product = await Product.findById({ _id: id });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(
    { _id: id },
    {
      $set: updatedProductInfo,
    },
    {
      opts,
    }
  ).exec();

  res.status(200).json({
    success: true,
    product: updatedProductInfo,
  });
});

// Delete Product
const deleteProduct = AsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById({ _id: id });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  } else {
    await Product.deleteOne({ _id: id });
  }

  res.status(200).json({
    success: true,
    message: 'Product Delete Successfully',
  });
});

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
