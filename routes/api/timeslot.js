//This entire route is dedicated to handling courses

const express = require('express'); //import express
const router = express.Router(); //importing express router
const config = require('config');
const { check, validationResult } = require('express-validator');

const Timeslot = require('../../models/Timeslot');

//#1   @route   GET api/courses
//#2   @desc    get all courses
//#3   @access  Public

router.get('/', async (req, res) => {
  try {
    const timeslot = await Timeslot.find();
    res.json(timeslot);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; //exporting the module
