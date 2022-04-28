//what do i need as far as instructor reducer functions??
import { GET_USER, USER_ERROR, USER_DELETED } from '../actions/types';

// we'll store an array of objects with an id, message, and alertType that communicates a success/failed login
const initialState = {
  users: [],
  loading: true,
  error: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action; //destructuring the action variables

  switch (type) {
    case GET_USER: //this is adding an alert to an array
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case USER_DELETED:
      return {
        ...state,
        users: payload,
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}

export default userReducer;
