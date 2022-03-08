// this is our root reducer, where all other reducers are stored.

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

export default combineReducers({ alert, auth });
