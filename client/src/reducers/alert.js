//This is our alert reducer that recieves information from the alert action file.
import { REMOVE_ALERT, SET_ALERT } from '../actions/types';

// we'll store an array of objects with an id, message, and alertType that communicates a success/failed login
//just in case the reducer has never been called before, we want to set our undefined state to an empty array
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action; //destructuring the action variables

  switch (type) {
    case SET_ALERT: //this is adding an alert to an array
      return [...state, payload]; //if there's an alert in there, we copy it with the spread operator and recieve it from our dispatch in the alert action file.
    case REMOVE_ALERT: //we're removing an alert by its id
      return state.filter((alert) => alert.id !== payload); //for each alert, check if the alert id !== the payload
    default:
      return state;
  }
}
