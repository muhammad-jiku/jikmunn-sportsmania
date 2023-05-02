//  external import
const express = require('express');
//  internal imports
const {
  processPayment,
  sendStripeApiKey,
} = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth/AuthMiddleware');

const paymentRouter = express.Router({
  caseSensitive: true,
});

paymentRouter
  .route('/payment/process')
  .post(isAuthenticatedUser, processPayment);

paymentRouter.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);

//  exporting module
module.exports = paymentRouter;
