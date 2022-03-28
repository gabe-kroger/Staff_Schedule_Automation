//this code is designed to create an outline of our registration request object

const mongoose = require("mongoose"); //importing mongoose
const RegistrationRequestSchema = new mongoose.Schema({
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
  // role represents users access level
  // 0 = admin
  // 1 = assistant
  // -1 = root
  role: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = RegistrationRequest = mongoose.model(
  "registrationrequest",
  RegistrationRequestSchema
); //exporting UserSchema model
