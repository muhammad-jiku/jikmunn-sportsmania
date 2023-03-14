const processPayment = (req, res, next) => {
  console.log('processing payment');
};

const sendStripeApiKey = (req, res, next) => {
  console.log('sending stripe key');
};

module.exports = {
  processPayment,
  sendStripeApiKey,
};
