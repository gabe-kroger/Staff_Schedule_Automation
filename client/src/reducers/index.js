// this is our root reducer, where all other reducers are stored.
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import course from './course';
import instructor from './instructor';
import users from './users';
import schedule from './schedule';
import collision from './collision';
import timeslot from './timeslot';

//This is all of our state. We can pull from this state by using connect() and passing in mapStateToProps();
export default combineReducers({
  alert,
  auth,
  profile,
  post,
  course,
  instructor,
  users,
  schedule,
  collision,
  timeslot,
});
