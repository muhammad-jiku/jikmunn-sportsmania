const express = require('express');
const {
  getAllProducts,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require('../controllers/productController');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../middlewares/auth/AuthMiddleware');

const productRouter = express.Router({
  caseSensitive: true,
});

productRouter.route('/products').get(getAllProducts);

productRouter
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

productRouter
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

productRouter
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

productRouter.route('/product/:id').get(getProductDetails);

productRouter.route('/review').put(isAuthenticatedUser, createProductReview);

productRouter
  .route('/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = productRouter;
