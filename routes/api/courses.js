//This entire route is dedicated to handling courses

const express = require('express'); //import express
const router = express.Router(); //importing express router
const config = require('config');
const { check, validationResult } = require('express-validator');

const Course = require('../../models/Course');

//#1   @route   POST api/courses --> "GET" is the request type and "api/courses" is the endpoint
//#2   @desc    Register Course --> description of what the route does
//#3   @access  Public --> access type, whether it's public or private  (if it's private, we need a token for auth...)

router.post(
  '/',
  [
    check('courseNumber', 'course number is required').not().isEmpty(),
    check('courseTitle', 'Please enter a course title').not().isEmpty(),
    check('disciplines', 'atleast one discipline is requried').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //this handles the response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are errors, send a 400 error
    }

    const { courseNumber, courseTitle, disciplines } = req.body;

    try {
      //see if course exists
      let course = await Course.findOne({ courseNumber });
      if (course) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Course already exists' }] });
      }
      //this makes a new course instance, but doesn't save it. We need to use course.save();
      course = new Course({
        courseNumber,
        courseTitle,
        disciplines,
      });

      await course.save(); //save the course in the database
      res.json(course);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router; //exporting the module
