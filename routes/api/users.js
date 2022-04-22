//This entire route is dedicated to handling registering and adding users

const express = require('express'); //import express
const router = express.Router(); //importing express router
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

//#1   @route   GET api/users --> "GET" is the request type and "api/users" is the endpoint
//#2   @desc    Register User --> description of what the route does
//#3   @access  Public --> access type, whether it's public or private  (if it's private, we need a token for auth...)
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //this handles the response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are errors, send a 400 error
    }

    const { name, email, password, role } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //get user's gravatar (We can delete this later)
      const avatar = gravatar.url(email, {
        s: '200', //this is the size
        r: 'pg', //this is the rating
        d: 'mm', //this is the default
      });

      //this makes a new user instance, but doesn't save it. We need to use user.save();
      user = new User({
        name,
        email,
        avatar,
        password,
        role,
      });
      //encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10); //creating a salt to do the hashing and returns 10 rounds.

      user.password = await bcrypt.hash(password, salt);

      await user.save(); //save the user in the database

      //return jsonwebtoken
      const payload = {
        //get the payload which includes the user id
        user: {
          id: user.id,
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
          res.json({ token, payload });
        }
      ); //change this to 3600 before deploying
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }

    //console.log(req.body); //logging the object of the data to be sent, but we need bodyparser middleware
  }
);

//#1   @route   GET api/users
//#2   @desc    Get all users with status of false
//#3   @access  public
router.get('/', async (req, res) => {
  try {
    const user = await User.find({ userStatus: false });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   PUT api/users/:user_id
//#2   @desc    update user by id
//#3   @access  public
router.put('/:user_id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.user_id },
      req.body,
      { new: true }
    );

    user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   DELETE api/instructors/:instructor_id
//#2   @desc    Delete instructor
//#3   @access  public

router.delete('/:user_id', async (req, res) => {
  try {
    //Remove user
    await User.findOneAndRemove({ _id: req.params.user_id });

    res.json({ msg: 'Instructor deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; //exporting the module
