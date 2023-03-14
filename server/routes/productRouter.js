const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require('../controllers/productController');

const productRouter = express.Router({
  caseSensitive: true,
});

productRouter.route('/products').get(getAllProducts);

// productRouter
//   .route('/admin/products')
//   .get( getAdminProducts);

productRouter.route('/admin/product/new').post(createProduct);

productRouter
  .route('/admin/product/:id')
  .put(updateProduct)
  .delete(deleteProduct);

productRouter.route('/product/:id').get(getProductDetails);

productRouter.route('/review').put(createProductReview);

productRouter.route('/reviews').get(getProductReviews).deleteput(deleteReview);

module.exports = productRouter;
