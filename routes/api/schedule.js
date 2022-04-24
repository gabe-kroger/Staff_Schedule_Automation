//This entire route is dedicated to handling schedule elements

const express = require('express'); //import express
const router = express.Router(); //importing express router
const config = require('config');
const { check, validationResult } = require('express-validator');

const Schedule = require('../../models/Schedule');

router.post(
  '/',
  [
    check('classID', 'class id number is required').not().isEmpty(),
    check('courseTitle', 'Please enter a course title').not().isEmpty(),
    check('instructor', 'enter a instructor').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //this handles the response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are errors, send a 400 error
    }

    const { classID, courseTitle, instructor, scheduledTime } = req.body;

    try {
      //see if course exists
      let schedule = await Schedule.findOne({ classID });
      if (schedule) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Course already exists' }] });
      }
      //this makes a new course instance, but doesn't save it. We need to use course.save();
      schedule = new Schedule({
        classID,
        courseTitle,
        instructor,
        scheduledTime,
      });

      await schedule.save(); //save the course in the database
      res.json(schedule);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//#1   @route   GET api/schedule
//#2   @desc    get all schedule elements
//#3   @access  Public

router.get('/', async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.json(schedule);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   DELETE api/schedule
//#2   @desc    Delete scheduled class
//#3   @access  public

router.delete('/:schedule_id', async (req, res) => {
  try {
    //Remove schedules class
    await Schedule.findOneAndRemove({ _id: req.params.schedule_id });

    res.json({ msg: 'Course section deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   PUT api/courses/:schedule_id
//#2   @desc    update instructor by id
//#3   @access  public
router.put('/:schedule_id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      { _id: req.params.schedule_id },
      req.body,
      { new: true }
    );

    schedule.save();
    res.json(schedule);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; //exporting the module
