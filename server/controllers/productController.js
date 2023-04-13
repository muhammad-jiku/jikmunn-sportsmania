const AsyncError = require('../middlewares/bugError/AsyncError');
const ErrorHandler = require('../middlewares/bugError/ErrorHandler');
const Product = require('../models/Product');
const ApiFeatures = require('../utils/ApiFeatures');

// Create Product - (admin)
const createProduct = AsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product
const getAllProducts = AsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product - (admin)
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

// Update Product - (admin)
const updateProduct = AsyncError(async (req, res, next) => {
  const id = req.params.id;

  let product = await Product.findById({ _id: id });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products',
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  const updatedProductInfo = req.body;
  const opts = {
    runValidators: true,
    new: true,
  };

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

// Delete Product - (admin)
const deleteProduct = AsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById({ _id: id });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  } else {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.deleteOne({ _id: id });
  }

  res.status(200).json({
    success: true,
    message: 'Product Delete Successfully',
  });
});

// Create New Review or Update the review
const createProductReview = AsyncError(async (req, res, next) => {
  const { _id, name } = await req.user;
  const { rating, comment, productId } = await req.body;

  const review = {
    user: _id,
    name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById({ _id: productId });

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === _id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === _id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  const productAndReviews = await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
    productAndReviews,
  });
});

// Get All Reviews of a product
const getProductReviews = AsyncError(async (req, res, next) => {
  const { id } = await req.query;
  const product = await Product.findById({ _id: id });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review - (admin)
const deleteReview = AsyncError(async (req, res, next) => {
  const { id, productId } = await req.query;
  const product = await Product.findById({ _id: productId });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  const updatedReviewsDetails = {
    reviews,
    ratings,
    numOfReviews,
  };
  const opts = {
    runValidators: true,
    new: true,
  };

  await Product.findByIdAndUpdate(
    { _id: productId },
    {
      $set: updatedReviewsDetails,
    },
    {
      opts,
    }
  );

  res.status(200).json({
    success: true,
    updatedReviewsDetails,
  });
});

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
