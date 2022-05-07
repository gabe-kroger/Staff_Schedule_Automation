//this code is designed to create an outline of our Instructor object

const mongoose = require('mongoose'); //importing mongoose
const TimeslotSchema = new mongoose.Schema({
  timeslotId: {
    type: Number,
    required: true,
  },
  timeslot: {
    type: String,
    required: true,
  },
  m: [
    {
      type: Number,
    },
  ],
  t: [
    {
      type: Number,
    },
  ],
  w: [
    {
      type: Number,
    },
  ],
  th: [
    {
      type: Number,
    },
  ],
  f: [
    {
      type: Number,
    },
  ],
  avoid: [
    {
      type: Number,
    },
  ],
});

module.exports = Timeslot = mongoose.model('timeslot', TimeslotSchema); //exporting InstructorSchema model
