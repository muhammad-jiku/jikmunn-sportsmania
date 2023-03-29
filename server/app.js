require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const productRouter = require('./routes/productRouter');
const paymentRouter = require('./routes/paymentRouter');
const errorMiddleware = require('./middlewares/bugError/errorMiddleware');

//  app initialize
const app = express();

// cors config
const corsConfig = {
  origin: true,
  credentials: true,
};

//  middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.disable('x-powered-by'); // less hackers know about our stack

//  displaying welcome message
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome here!',
  });
});

app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', paymentRouter);

// Middleware for Errors
app.use(errorMiddleware);

// exporting module
module.exports = app;
