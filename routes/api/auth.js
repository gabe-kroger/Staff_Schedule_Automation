// this entire route is dedicated to authenticating existing users for logging in

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

//#1   @route   POST api/auth --> we're making a "POST" request to api/auth
//#2   @desc    authenticate user and get token
//#3   @access  Public --> public because we're getting the token so we can make requests to private routes

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(), //making sure there's an email
    check('password', 'Password is required').exists(), // making sure the password exists
  ],
  //checking for errors in the req.body
  async (req, res) => {
    const errors = validationResult(req); //this handles the response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are errors, send a 400 error
    }

    const { email, password, userStatus = 'true' } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //match the input password with the user's password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        //if no match, return invalid credentials
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //match the input status with the user's status
      if (userStatus !== user.userStatus.toString()) {
        //if no match, Invalid Credentials
        return res
          .status(400)
          .json({ errors: [{ msg: 'User not validated yet' }] });
      }

      //return jsonwebtoken
      const payload = {
        //get the payload which includes the user id
        user: {
          id: user.id, //setting the id
          role: user.role,
          userStatus: user.userStatus,
        },
      };

      jwt.sign(
        //sign the token
        payload, //pass in the payload
        config.get('jwtSecret'), //pass in the secret
        { expiresIn: 360000 }, //set an expiration data (optional)
        (error, token) => {
          //inside the callback get the token, otherwise send an error
          if (error) {
            throw error;
          }
          res.json({ token });
        }
      ); //change this to 3600 before deploying
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }

    //console.log(req.body); //logging the object of the data to be sent, but we need bodyparser middleware
  }
);

module.exports = router; //exporting the module
