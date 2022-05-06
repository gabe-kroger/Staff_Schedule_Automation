//this code is designed to create the schedule objects

const mongoose = require('mongoose'); //importing mongoose
const ErrorSchema = new mongoose.Schema({
  error: {
    type: String,
  },
});

module.exports = Error = mongoose.model('error', ErrorSchema); //exporting CourseSchema model
