// this middleware code is designed to access req/res object in order to send/recieve tokens for verification
// to basically verify the json web token that comes in from the client and authenticate our users

const jwt = require('jsonwebtoken');
const config = require('config');

//we want to export a middleware function that has the req/res object
module.exports = (req, res, next) => {
  //get the token from the header
  const token = req.header('x-auth-token'); // x-auth-token is the header key in postman. token is header value.
  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); //if no token && the route is protected
  }

  //verify the token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); //this decodes the token

    req.user = decoded.user; //setting request.user to the decoded token

    next(); //moves to next middleware function
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' }); //there is a token, but it's not valid
    console.error(error);
  }
};
