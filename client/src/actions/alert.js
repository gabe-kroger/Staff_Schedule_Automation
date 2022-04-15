//this is our alert action that is going to occur. First we dispatch set_alert, then we dispatch remove_alert.
//another side note, since we have this alert action set up, we can call this action from anywhere in the codebase.

//Also, the actions folder is responsible for making axios calls to the backend.

import { v4 as uuidv4 } from 'uuid'; //importing uuid as v4 (which is old).
import { SET_ALERT } from './types';
import { REMOVE_ALERT } from './types';

//this is our action called setAlert that will dispatch a type of SET_ALERT and pass in a payload with a msg, alertType and id. We're also going to dispatch a type of REMOVE_ALERT after 5 seconds and pass in a payload of id.
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    //we'll pass in these parameters in Register component.
    // we set the message and alertType
    const id = uuidv4(); //we want to randomly generate the id
    //we need to dispatch what is inside our alert reducer, which needs the type and payload passed in and sent along
    dispatch({
      type: SET_ALERT, //we are dispatching our alert and retrieving this in alert.js reducer.
      payload: { msg, alertType, id }, //we're passing an alert object with alert.msg, alert.alertType and alert.id
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout); //after 5 seconds, dispatch remove alert.
  };
