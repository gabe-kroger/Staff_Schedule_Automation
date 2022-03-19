// this is the reducer for auth and is going to handle registration
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/types';

//this is our state for authentication
const initialState = {
  token: localStorage.getItem('token'), //fetching the token (seeing if it's even there) and saving it in state.
  isAuthenticated: null, //when user logs in, this changes to true. This changes NavBar when user is logged in.
  loading: true, //when user is authenticated, make sure we already made a req to backend and got a res.
  user: null,
};

//this default function takes the state and the dispatched action
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS: // if register is success, we want to the token so we can log in right away
    case LOGIN_SUCCESS: //this is the same as register_success
      localStorage.setItem('token', payload.token); //we're putting the token inside localStorage.
      return {
        ...state, //whatever is currently in the state, bc state is immutable
        ...payload,
        isAuthenticated: true,
        loading: false, //we already got the response and it's been loaded, so set this to false.
      };
    case REGISTER_FAIL: //if register fails, we want to display an error message
    case AUTH_ERROR: //Auth error is doing the same thing as register fail
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
