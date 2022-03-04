const mongoose = require('mongoose'); //we're using mongoose to connect
const config = require('config'); //bring config in so we can use the connection string
const db = config.get('mongoURI'); //to get mongoURI connection string, use config.get to get any values in the file

//connect to mongodb and pass in db which returns a promise. We want this to be async/await so use the func connectDB.
//we put mongoose.connect in a try/catch in case there's an error and we can't connect.
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true }); //use new url parser because of deprecation warning.

    console.log('MongoDB connected...'); //we successfully connected
  } catch (error) {
    console.error(error.message);
    process.exit(1); //we did not connect, so terminate the connection.
  }
};

module.exports = connectDB; //we want to export this code
