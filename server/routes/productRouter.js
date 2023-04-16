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
  authorizeAdmin,
} = require('../middlewares/auth/AuthMiddleware');

const productRouter = express.Router({
  caseSensitive: true,
});

productRouter.route('/products').get(getAllProducts);

productRouter
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizeAdmin, getAdminProducts);

productRouter
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeAdmin, createProduct);

productRouter
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeAdmin, updateProduct)
  .delete(isAuthenticatedUser, authorizeAdmin, deleteProduct);

productRouter.route('/product/:id').get(getProductDetails);

productRouter.route('/review').put(isAuthenticatedUser, createProductReview);

productRouter
  .route('/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, authorizeAdmin, deleteReview);

module.exports = productRouter;
