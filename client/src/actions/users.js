import api from '../utils/api';
import { setAlert } from './alert';
import { GET_USER, USER_ERROR, USER_DELETED } from './types';

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

// Delete user from api/user
export const deleteUser = (id) => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete this user? This can NOT be undone!'
    )
  ) {
    try {
      await api.delete(`users/${id}`);

      dispatch({ type: USER_DELETED });

      dispatch(setAlert('This user has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Approve user (change userStatus: true)
export const approveUser = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`users/${id}`, formData);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });

    //dispatch(setAlert('User Accepted', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
