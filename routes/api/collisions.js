//This entire route is dedicated to handling schedule elements

const express = require('express'); //import express
const router = express.Router(); //importing express router
const config = require('config');
const { check, validationResult } = require('express-validator');
const request = require('request');

const Collision = require('../../models/Collision');

//#1   @route   GET api/schedule
//#2   @desc    get all schedule elements
//#3   @access  Public

router.get('/', async (req, res) => {
  try {
    const collision = await Collision.find();
    res.json(collision);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.post('/check', function (req, res, next) {
  request({
    uri: 'https://us-central1-cpsc4387p1.cloudfunctions.net/check-algorithm',
  }).pipe(res);
});

module.exports = router; //exporting the module
