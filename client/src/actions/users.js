import api from '../utils/api';
import { setAlert } from './alert';
import { GET_USER, USER_ERROR } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get all users from api/users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/users'); //this is our res variable which contains data from api/users

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    });
  }
};
