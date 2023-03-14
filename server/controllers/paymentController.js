const processPayment = (req, res, next) => {
  res.send({
    message: 'processing payment',
  });
};

const sendStripeApiKey = (req, res, next) => {
  res.send({
    message: 'sending stripe key',
  });
};

module.exports = {
  processPayment,
  sendStripeApiKey,
};
