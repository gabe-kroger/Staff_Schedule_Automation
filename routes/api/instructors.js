//This entire route is dedicated to handling instructors

const express = require("express"); //import express
const router = express.Router(); //importing express router
const config = require("config");
const { check, validationResult } = require("express-validator");

const Instructor = require("../../models/Instructor");

//#1   @route   GET api/users --> "GET" is the request type and "api/users" is the endpoint
//#2   @desc    Register User --> description of what the route does
//#3   @access  Public --> access type, whether it's public or private  (if it's private, we need a token for auth...)

router.post(
  "/",
  [
    check("lastName", "lastName is required").not().isEmpty(),
    check(
      "maxClasses",
      "Please enter the max class load, between 1 and 4 of the instructor"
    )
      .not()
      .isEmpty()
      .isInt({ min: 1, max: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); //this handles the response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if there are errors, send a 400 error
    }

    const { lastName, maxClasses } = req.body;

    try {
      //see if user exists
      let instructor = await Instructor.findOne({ lastName });
      if (instructor) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Instructor already exists" }] });
      }
      //this makes a new user instance, but doesn't save it. We need to use user.save();
      instructor = new Instructor({
        lastName,
        maxClasses,
      });

      await instructor.save(); //save the user in the database
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
    res.json({ status: "success" });
  }
);

module.exports = router; //exporting the module
