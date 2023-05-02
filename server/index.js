//  external import
const cloudinary = require('cloudinary');
//  internal imports
const app = require('./app');
const databaseConnect = require('./utils/dbConnect');

//  port
const port = process.env.PORT || 5000;

//  development purpose error handling =>
// // Handling Uncaught Exception
// process.on('uncaughtException', (err) => {
//   // console.log(`Error: ${err.message}`);
//   // console.log(`Shutting down the server due to Uncaught Exception`);
//   process.exit(1);
// });

// Connecting to database
databaseConnect();

//  Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  listening to the port
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//  deveopment purpose error handling =>

// // if express fail to handle any error for that there's global errorHandler: Unhandled Promise Rejection
// process.on('unhandledRejection', (err) => {
//   // console.log(`Error: ${err.message}`);
//   // console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });
