//this code is designed to create the schedule objects

const mongoose = require('mongoose'); //importing mongoose
const ScheduleSchema = new mongoose.Schema({
  classID: {
    type: Number,
  },
  crn: {
    type: String,
  },
  courseTitle: {
    type: String,
  },
  instructors: {
    type: [String],
  },
  scheduledTimes: {
    type: [String],
  },
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema); //exporting CourseSchema model
