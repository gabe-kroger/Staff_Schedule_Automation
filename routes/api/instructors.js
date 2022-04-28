//This entire route is dedicated to handling instructors

const express = require('express'); //import express
const router = express.Router(); //importing express router
const config = require('config');
const { check, validationResult } = require('express-validator');

const Instructor = require('../../models/Instructor');

//#1   @route   POST api/instructors --> "GET" is the request type and "api/instructors" is the endpoint
//#2   @desc    Register Instructor --> description of what the route does
//#3   @access  Public --> access type, whether it's public or private  (if it's private, we need a token for auth...)

router.post(
  '/',
  [
    check('lastName', 'last name is required').not().isEmpty(),
    check(
      'maxClasses',
      'Please enter the max class load, between 1 and 4 of the instructor'
    )
      .not()
      .isEmpty()
      .isInt({ min: 1, max: 4 }),
    check('disciplines', 'at least one discipline is requried').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //this handles the response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are errors, send a 400 error
    }

    const { lastName, maxClasses, disciplines, assignedClasses } = req.body;

    const instructorFields = {};
    instructorFields.assignedClasses = 0;
    if (lastName) instructorFields.lastName = lastName;
    if (maxClasses) instructorFields.maxClasses = maxClasses;
    if (disciplines) {
      instructorFields.disciplines = disciplines
        .split(',')
        .map((discipline) => discipline.trim());
    }

    try {
      //see if instructor exists
      let instructor = await Instructor.findOne({ lastName });
      if (instructor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Instructor already exists' }] });
      }
      //this makes a new instructor instance, but doesn't save it. We need to use instructor.save();
      instructor = new Instructor(instructorFields);

      await instructor.save(); //save the instructor in the database
      res.json(instructor);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//#1   @route   GET api/instructors
//#2   @desc    get all instructors
//#3   @access  Public

router.get('/', async (req, res) => {
  try {
    const instructor = await Instructor.find();
    res.json(instructor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   DELETE api/instructors/:instructor_id
//#2   @desc    Delete instructor
//#3   @access  public

router.delete('/:instructor_id', async (req, res) => {
  try {
    //Remove user
    await Instructor.findOneAndRemove({ _id: req.params.instructor_id });

    res.json({ msg: 'Instructor deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   PUT api/instructors/:instructor_id
//#2   @desc    update instructor by id
//#3   @access  public
router.put('/:instructor_id', async (req, res) => {
  try {
    const { lastName, maxClasses, disciplines, assignedClasses } = req.body;

    const instructorFields = {};
    if (assignedClasses) instructorFields.assignedClasses = 0;
    if (lastName) instructorFields.lastName = lastName;
    if (maxClasses) instructorFields.maxClasses = maxClasses;
    if (disciplines) {
      instructorFields.disciplines = disciplines
        .split(',')
        .map((discipline) => discipline.trim());
    }
    const instructor = await Instructor.findByIdAndUpdate(
      { _id: req.params.instructor_id },
      instructorFields,
      { new: true }
    );

    instructor.save();
    res.json(instructor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; //exporting the module
