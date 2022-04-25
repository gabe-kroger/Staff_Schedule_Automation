//what do i need as far as instructor reducer functions??
import {
  CREATE_INSTRUCTOR_FAIL,
  CREATE_INSTRUCTOR_SUCCESS,
  GET_INSTRUCTOR,
  INSTRUCTOR_DELETED,
  INSTRUCTOR_SELECTED,
  INSTRUCTOR_UPDATED,
  INSTRUCTOR_ERROR,
  REMOVE_ALERT,
  SET_ALERT,
  CREATE_COURSE_FAIL,
} from '../actions/types';

// we'll store an array of objects with an id, message, and alertType that communicates a success/failed login
const initialState = {
  instructor: [],
  loading: true,
  error: {},
  instructorSelected: null,
};

function instructorReducer(state = initialState, action) {
  const { type, payload } = action; //destructuring the action variables

  switch (type) {
    case GET_INSTRUCTOR: //this is adding an alert to an array
      return {
        ...state,
        instructor: payload,
        loading: false,
      };
    case CREATE_INSTRUCTOR_SUCCESS: //this is adding an alert to an array
      return {
        ...state,
        instructor: payload,
        loading: false,
      };
    case CREATE_INSTRUCTOR_FAIL:
    case INSTRUCTOR_UPDATED:
      return {
        ...state,
      };
    case INSTRUCTOR_SELECTED:
      return {
        ...state,
        instructorSelected: payload,
      };
    case INSTRUCTOR_DELETED: //we're removing an alert by its id
      return {
        ...state,
        instructor: payload,
      };
    case INSTRUCTOR_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

export default instructorReducer;
