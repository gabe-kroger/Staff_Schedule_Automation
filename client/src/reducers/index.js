// this is our root reducer, where all other reducers are stored.
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import course from './course';
import instructor from './instructor';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  course,
  instructor,
});
