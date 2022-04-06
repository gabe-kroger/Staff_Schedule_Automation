//this code is designed to create an outline of our Course object

const mongoose = require('mongoose'); //importing mongoose
const CourseSchema = new mongoose.Schema({
  courseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  disciplines: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = Course = mongoose.model('course', CourseSchema); //exporting CourseSchema model
