//what do i need as far as course reducer functions??
import {
  GET_COLLISION,
  COLLISION_ERROR,
  GENERATE_COLLISION,
} from '../actions/types';

// we'll store an array of objects with an id, message, and alertType that communicates a success/failed login
const initialState = {
  collision: [],
  loading: true,
  error: {},
};

function collisionReducer(state = initialState, action) {
  const { type, payload } = action; //destructuring the action variables

  switch (type) {
    case GET_COLLISION: //this is adding an alert to an array
    case GENERATE_COLLISION: //this is adding an alert to an array
      return {
        ...state,
        collision: payload,
        loading: false,
      };
    case COLLISION_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

export default collisionReducer;
