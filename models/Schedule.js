//this code is designed to create the schedule objects

const mongoose = require('mongoose'); //importing mongoose
const ScheduleSchema = new mongoose.Schema({
  classID: {
    type: Number,
  },
  courseTitle: {
    type: String,
  },
  instructor: {
    type: String,
  },
  scheduledTime: {
    type: String,
  },
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema); //exporting CourseSchema model
