import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_INSTRUCTOR,
  INSTRUCTOR_DELETED,
  INSTRUCTOR_ERROR,
  CREATE_INSTRUCTOR_FAIL,
  CREATE_INSTRUCTOR_SUCCESS,
  INSTRUCTOR_SELECTED,
  INSTRUCTOR_UPDATED,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get all instructors from api/instructors
export const getInstructors = () => async (dispatch) => {
  try {
    const res = await api.get('/instructors'); //this is our res variable which contains data from api/instructors

    dispatch({
      type: GET_INSTRUCTOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create new instructor from api/instructors
export const createInstructor = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/instructors', formData);

    dispatch({
      type: CREATE_INSTRUCTOR_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Instructor Created', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CREATE_INSTRUCTOR_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update instructor by ID from api/instructor/:instructor_id
export const updateInstructor =
  (id, formData, navigate) => async (dispatch) => {
    try {
      const res = await api.put(`/instructors/${id}`, formData);

      dispatch({
        type: INSTRUCTOR_UPDATED,
        payload: res.data,
      });

      dispatch(setAlert('Instructor Edited', 'success'));

      navigate('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: INSTRUCTOR_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete instructor from api/instructors
export const deleteInstructor = (id) => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete this instructor? This can NOT be undone!'
    )
  ) {
    try {
      await api.delete(`instructors/${id}`);

      dispatch({ type: INSTRUCTOR_DELETED });

      dispatch(setAlert('This instructor has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: INSTRUCTOR_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Delete instructor from api/instructors
export const selectedInstructor = (instructorSelected) => async (dispatch) => {
  try {
    dispatch({
      type: INSTRUCTOR_SELECTED,
      payload: instructorSelected,
    });
  } catch (err) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
