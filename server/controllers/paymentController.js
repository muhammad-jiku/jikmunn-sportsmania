//  external import
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//  internal import
const AsyncError = require('../middlewares/bugError/AsyncError');

//  Payment
const processPayment = AsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    payment_method_types: ['card'],
    metadata: {
      company: 'Sports Mania',
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

//  Stripe Key
const sendStripeApiKey = AsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

// exporting modules
module.exports = {
  processPayment,
  sendStripeApiKey,
};
