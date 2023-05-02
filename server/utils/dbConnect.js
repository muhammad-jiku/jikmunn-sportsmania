//  external import
const mongoose = require('mongoose');

// database uri
const uri = `${process.env.DB_URI}`;

// connecting to the database
const databaseConnect = async () => {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log('DB connected!!');
      //   console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      // console.log(err);
      console.log('Something Went Wrong!');
    });
};

// exporting module
module.exports = databaseConnect;
