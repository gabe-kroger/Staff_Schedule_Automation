//what do i need as far as course reducer functions??
import { GET_TIMESLOT, TIMESLOT_ERROR } from '../actions/types';

// we'll store an array of objects with an id, message, and alertType that communicates a success/failed login
const initialState = {
  timeslot: [],
  loading: true,
  error: {},
};

function timeslotReducer(state = initialState, action) {
  const { type, payload } = action; //destructuring the action variables

  switch (type) {
    case GET_TIMESLOT: //this is adding an alert to an array
      return {
        ...state,
        timeslot: payload,
        loading: false,
      };
    case TIMESLOT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

export default timeslotReducer;
