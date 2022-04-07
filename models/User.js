//this code is designed to create an outline of our user object

const mongoose = require('mongoose'); //importing mongoose
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  // role represents users access level
  // 0 = admin
  // 1 = assistant
  // -1 = root
  role: {
    type: String,
    required: true,
  },
  userStatus: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema); //exporting UserSchema model
