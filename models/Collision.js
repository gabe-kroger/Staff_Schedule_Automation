//this code is designed to create an outline of our Course object

const mongoose = require('mongoose'); //importing mongoose
const CollisionSchema = new mongoose.Schema({
  errormsg: {
    type: String,
    required: true,
  },
});

module.exports = Collision = mongoose.model('collision', CollisionSchema); //exporting CourseSchema model
