const express = require('express');
const {
  processPayment,
  sendStripeApiKey,
} = require('../controllers/paymentController');

const paymentRouter = express.Router({
  caseSensitive: true,
});

paymentRouter.route('/payment/process').post(processPayment);

paymentRouter.route('/stripeapikey').get(sendStripeApiKey);

module.exports = router;
