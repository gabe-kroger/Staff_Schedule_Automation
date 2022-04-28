//what do i need as far as course reducer functions??
import {
  CREATE_SCHEDULE_FAIL,
  CREATE_SCHEDULE_SUCCESS,
  GET_SCHEDULE,
  SCHEDULE_DELETED,
  GENERATE_SCHEDULE,
  SCHEDULE_ERROR,
  SCHEDULE_SELECTED,
  REMOVE_ALERT,
  SET_ALERT,
} from '../actions/types';

// we'll store an array of objects with an id, message, and alertType that communicates a success/failed login
const initialState = {
  schedule: [],
  loading: true,
  error: {},
  scheduleSelected: null,
};

function scheduleReducer(state = initialState, action) {
  const { type, payload } = action; //destructuring the action variables

  switch (type) {
    case GET_SCHEDULE: //this is adding an alert to an array
    case GENERATE_SCHEDULE:
    case CREATE_SCHEDULE_SUCCESS: //this is adding an alert to an array
      return {
        ...state,
        schedule: payload,
        loading: false,
      };
    case SCHEDULE_DELETED: //we're removing an alert by its id
      return {
        ...state,
        schedule: payload,
      };
    case CREATE_SCHEDULE_FAIL:
      return {
        ...state,
      };
    case SCHEDULE_SELECTED:
      return {
        ...state,
        scheduleSelected: payload,
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

export default scheduleReducer;
