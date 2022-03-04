//handles creating posts
const express = require('express'); //import express
const router = express.Router(); //importing express router
const auth = require('../../middleware/auth'); //auth from middleware for Private routes
const Post = require('../../models/Post'); //importing Post model
const Profile = require('../../models/Profile'); //importing Profile model
const User = require('../../models/User'); //importing User model
const { check, validationResult } = require('express-validator/check'); //Allows us to make checks

//#1   @route   POST api/posts --> "POST" is the request type and "api/users" is the endpoint
//#2   @desc    Create a post
//#3   @access  Private
router.post(
  '/',
  [
    auth, //makes our route private and secured
    [
      check('text', 'Text is required').not().isEmpty(), //making checks for Required sections of Post model
      //check('status', 'Status is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password'); //find user, but don't return password

      // create/instantiate a new Post object
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post); //return the post to the console in the API
    } catch (error) {
      console.error('error');
      res.status(500).send('Server Error');
    }
  }
);

//#1   @route   GET api/posts
//#2   @desc    Get all posts
//#3   @access  Private
router.get('/', auth, async (req, res) => {
  try {
    //Get all posts
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error('error');
    res.status(500).send('Server Error');
  }
});

//#1   @route   GET api/posts/:id
//#2   @desc    Get post by id
//#3   @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    //Get post by id
    const post = await Post.findById(req.params.id); //req.params.id pulls the id from the parameters of the url

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('error');
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

//#1   @route   DELETE api/posts/:id
//#2   @desc    Delete post by id
//#3   @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    //Get post by id
    const post = await Post.findById(req.params.id); //req.params.id pulls the id from the parameters of the url

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //make sure that the user deleting the post actually owns the post.
    //post.user is user that owns the post and req.user.id is the logged in user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' }); //401 error is not authorized
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error('error');
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

//#1   @route   PUT api/posts/like/:id
//#2   @desc    add likes[]
//#3   @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    //Get all posts
    const post = await Post.findById(req.params.id); //find the post according to the ID in the URL.

    //check if the post has already been liked by user (like.user is not a string so we use toString() method)
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id }); //push() likes to buttom of likes[] array for user of that specific id.

    await post.save(); //save to the database

    res.json(post.likes); //returning the like in the API
  } catch (error) {
    console.error('error');
    res.status(500).send('Server Error');
  }
});

//#1   @route   PUT api/posts/unlike/:id
//#2   @desc    add likes[]
//#3   @access  Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//#1   @route   POST api/posts/comments/:id
//#2   @desc    Add comments on a post
//#3   @access  Private
router.post(
  '/comment/:id',
  [
    auth, //makes our route private and secured
    [
      check('text', 'Text is required').not().isEmpty(), //making checks for Required sections of Post model
      //check('status', 'Status is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password'); //find user, but don't return password
      const post = await Post.findById(req.params.id);

      // create/instantiate a new Post object
      const newComment = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments); //return the post to the console in the API
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//#1   @route   DELETE api/posts/comments/:id/:comment_id
//#2   @desc    Delete comments on a post
//#3   @access  Private

// just to specify in the URL this is /comments then /post_id then /comment_id
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router; //exporting the module
