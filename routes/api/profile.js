//this route is designed to fetch individual profiles

const express = require('express'); //import express
const router = express.Router(); //importing express router
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator/check');

//#1   @route   GET api/profile/me
//#2   @desc    GET current user's profile
//#3   @access  Private because we're getting the profile by the userid that is in the token, which means that we need to bring in the auth middleware

// for every route that we want to protect, just add 'auth' as a parameter
router.get('/me', auth, async (req, res) => {
  try {
    //'user' pertains to the userRef in ProfileSchema
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar', 'role', 'userStatus']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' }); //if no profile, send error
    }

    res.json(profile); //if there is a profile, send the profile
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   POST api/profile/me
//#2   @desc    Create or Update a user profile
//#3   @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'status required').not().isEmpty(),
      check('skills', 'skills required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    console.log(profileFields.social.twitter);

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile); //we're returning the entire profile
      }

      //Create new profile
      profile = new Profile(profileFields);

      await profile.save(); //save the profile
      res.json(profile); //return the profile
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//#1   @route   GET api/profile/
//#2   @desc    Get all profiles
//#3   @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
      'role',
      'userStatus',
    ]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   GET api/profile/user/:user_id
//#2   @desc    Get profile by user id
//#3   @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'role', 'userStatus']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   DELETE api/profile
//#2   @desc    Delete profile, user & posts
//#3   @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    //remove users posts
    await Post.deleteMany({ user: req.user.id });
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    //
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   PUT api/profile/experience
//#2   @desc    Add experience[] to profile
//#3   @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors, display a 400 status error with an array of errors
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    //destructuring and pulling out member variables
    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = { title, company, location, from, to, current, description };

    try {
      // adding and updating profile
      //we need to fetch the profile that we want to add the experience to
      //we use the "Profile" model and we get req.user.id from the token
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp); //unshift is like Push(), pushing newExp to the bottom of experience[] array

      await profile.save(); //saving the profile
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//#1   @route   PUT api/profile/education
//#2   @desc    Add education[] to profile
//#3   @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School field is required').not().isEmpty(),
      check('degree', 'Degree field is required').not().isEmpty(),
      check('fieldofstudy', 'Field of Study field is required').not().isEmpty(),
      check('from', 'From Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //display any errors in the UI
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      //update the Education[] array with newEducation;
      //fetch the Profile model and use the id of the user to update the specific profile
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('Server Error');
    }
  }
);

//#1   @route   DELETE api/profile/experience/:exp_id
//#2   @desc    Delete experience[] according to exp_id
//#3   @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    // get the id of the user
    const profile = await Profile.findOne({ user: req.user.id });

    //Get the id of the specific experience
    const removeIndex = profile.experience.map((item) => {
      if (item.id === req.params.exp_id) {
        return item.remove();
      }
    });

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server Error');
  }
});

//#1   @route   DELETE api/profile/experience/:edu_id
//#2   @desc    Delete education[] according to edu_id
//#3   @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education.map((item) => {
      if (item.id === req.params.edu_id) {
        return item.remove();
      }
    });

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; //exporting the module
