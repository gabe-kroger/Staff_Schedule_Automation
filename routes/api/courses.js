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

    const courseFields = {};
    if (courseNumber) courseFields.courseNumber = courseNumber;
    if (courseTitle) courseFields.courseTitle = courseTitle;
    if (disciplines) {
      courseFields.disciplines = disciplines
        .split(',')
        .map((discipline) => discipline.trim());
    }

    try {
      //see if course exists
      let course = await Course.findOne({ courseNumber });
      if (course) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Course already exists' }] });
      }
      //this makes a new course instance, but doesn't save it. We need to use course.save();
      course = new Course(courseFields);

      await course.save(); //save the course in the database
      res.json(course);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//#1   @route   GET api/courses
//#2   @desc    get all courses
//#3   @access  Public

router.get('/', async (req, res) => {
  try {
    const course = await Course.find();
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   DELETE api/courses
//#2   @desc    Delete course
//#3   @access  public

router.delete('/:course_id', async (req, res) => {
  try {
    //Remove user
    await Course.findOneAndRemove({ _id: req.params.course_id });

    res.json({ msg: 'Course deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   PUT api/courses/:course_id
//#2   @desc    update instructor by id
//#3   @access  public
router.put('/:course_id', async (req, res) => {
  try {
    const { courseNumber, courseTitle, disciplines } = req.body;

    const courseFields = {};
    if (courseNumber) courseFields.courseNumber = courseNumber;
    if (courseTitle) courseFields.courseTitle = courseTitle;
    if (disciplines) {
      courseFields.disciplines = disciplines
        .split(',')
        .map((discipline) => discipline.trim());
    }
    const course = await Course.findByIdAndUpdate(
      { _id: req.params.course_id },
      courseFields,
      { new: true }
    );

    course.save();
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; //exporting the module
