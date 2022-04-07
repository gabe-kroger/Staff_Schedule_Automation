//this code is designed to create an outline of our Instructor object

const mongoose = require('mongoose'); //importing mongoose
const InstructorSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  maxClasses: {
    type: Number,
    required: true,
  },
  assignedClasses: {
    type: Number,
  },
  disciplines: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = Instructor = mongoose.model('instructor', InstructorSchema); //exporting InstructorSchema model
