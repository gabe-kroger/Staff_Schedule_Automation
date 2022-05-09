//This entire route is dedicated to handling schedule elements

const express = require('express'); //import express
const router = express.Router(); //importing express router
const config = require('config');
const { check, validationResult } = require('express-validator');
const request = require('request');

const Schedule = require('../../models/Schedule');
const Course = require('../../models/Course');
const Instructor = require('../../models/Instructor');
router.post(
  '/',
  [
    check('classID', 'class id number is required').not().isEmpty(),
    check('crn', 'Please enter a crn').not().isEmpty(),
    check('instructors', 'enter a instructors').not().isEmpty(),
    check('scheduledTimes', 'Please select a time').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //this handles the response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are errors, send a 400 error
    }

    const { classID, crn, courseTitle, instructors, scheduledTimes } = req.body;

    const scheduleFields = {};
    if (classID) scheduleFields.classID = classID;
    if (crn) scheduleFields.crn = crn;
    if (courseTitle) scheduleFields.courseTitle = courseTitle;
    if (instructors) {
      scheduleFields.instructors = instructors
        .split(',')
        .map((instructor) => instructor.trim());
    }
    if (scheduledTimes) {
      scheduleFields.scheduledTimes = scheduledTimes
        .split(',')
        .map((scheduledTime) => scheduledTimes.trim());
    }

    try {
      //see if schedule exists
      let schedule = await Schedule.findOne({ classID });
      if (schedule) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Sschedule id exists' }] });
      }
      // check if user entered crn is valid
      let course = await Course.findOne({ courseNumber: crn });
      if (!course) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'crn not found in couerses' }] });
      }
      //check if instructors is valid
      let inst = await Instructor.findOne({ lastName: instructors });
      if (!inst) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'instructors not found in instructors' }] });
      }
      //this makes a new course instance, but doesn't save it. We need to use course.save();
      schedule = new Schedule(scheduleFields);

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

    res.json({ msg: 'Scheduled class deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   PUT api/courses/:schedule_id
//#2   @desc    update instructors by id
//#3   @access  public
router.put('/:schedule_id', async (req, res) => {
  try {
    const { classID, crn, courseTitle, instructors, scheduledTimes } = req.body;

    const scheduleFields = {};
    if (classID) scheduleFields.classID = classID;
    if (crn) scheduleFields.crn = crn;
    if (courseTitle) scheduleFields.courseTitle = courseTitle;
    if (instructors) {
      scheduleFields.instructors = instructors
        .split(',')
        .map((instructor) => instructor.trim());
    }
    if (scheduledTimes) {
      scheduleFields.scheduledTimes = scheduledTimes
        .split(',')
        .map((scheduledTime) => scheduledTime.trim());
    }

    const schedule = await Schedule.findByIdAndUpdate(
      { _id: req.params.schedule_id },
      scheduleFields,
      { new: true }
    );

    schedule.save();
    res.json(schedule);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.post('/generate', function (req, res, next) {
  request({
    uri: 'https://us-central1-cpsc4387p1.cloudfunctions.net/geneticalgo',
  }).pipe(res);
});

module.exports = router; //exporting the module
