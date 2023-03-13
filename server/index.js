require('dotenv').config();
const cors = require('cors');
const express = require('express');

//  app initialize
const app = express();

//  port
const port = process.env.PORT || 5000;

// cors config
const corsConfig = {
  origin: true,
  credentials: true,
};

//  middlewares
app.use(express.json());
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.disable('x-powered-by'); // less hackers know about our stack

//  displaying welcome message
app.get('/', (req, res) => {
  res.status(300).json({
    message: 'Welcome here!',
  });
});

//  listening to the port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// if express fail to handle any error for that there's global errorHandler
process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log(err.message);
  app.close(() => {
    process.exit(1);
  });
});
