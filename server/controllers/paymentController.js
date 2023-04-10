const AsyncError = require('../middlewares/bugError/AsyncError');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

const sendStripeApiKey = (req, res, next) => {
  res.send({
    message: 'sending stripe key',
  });
};

module.exports = {
  processPayment,
  sendStripeApiKey,
};
