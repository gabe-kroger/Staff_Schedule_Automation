//This entire route is dedicated to handling registration requests

const express = require("express"); //import express
const router = express.Router(); //importing express router
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/RegistrationRequest");
const RegistrationRequest = require("../../models/RegistrationRequest");

//#1   @route   GET api/registrationrequests --> "GET" is the request type and "api/users" is the endpoint
//#2   @desc    Register Request --> description of what the route does
//#3   @access  Public --> access type, whether it's public or private  (if it's private, we need a token for auth...)

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("role", "Please select a role to request").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); //this handles the response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are errors, send a 400 error
    }

    const { name, email, role, password } = req.body;

    try {
      //see if user exists
      let registrationrequest = await RegistrationRequest.findOne({ email });
      let user = await User.findOne({ email });
      if (registrationrequest) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User registration still pending" }] });
      } else if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      registrationrequest = await User.findOne({ email });

      //this makes a new user instance, but doesn't save it. We need to use user.save();
      registrationrequest = new RegistrationRequest({
        name,
        email,
        role,
        password,
      });

      //encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10); //creating a salt to do the hashing and returns 10 rounds.

      registrationrequest.password = await bcrypt.hash(password, salt);

      await registrationrequest.save(); //save the user in the database

      res.json({
        msg: "Registration Request Successfully Submitted",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }

    //console.log(req.body); //logging the object of the data to be sent, but we need bodyparser middleware
  }
);

module.exports = router; //exporting the module
