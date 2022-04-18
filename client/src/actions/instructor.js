import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_INSTRUCTOR,
  INSTRUCTOR_DELETED,
  INSTRUCTOR_ERROR,
  CREATE_INSTRUCTOR_FAIL,
  CREATE_INSTRUCTOR_SUCCESS,
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
    });
  }
};

// Delete instructor from api/instructors
export const deleteInstructor = () => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete this instructor? This can NOT be undone!'
    )
  ) {
    try {
      await api.delete('/instructors');

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

// update instructor by ID from api/instructor/:instructor_id
export const updateInstructor =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.put('/instructors/:instructor_id', formData);

      dispatch({
        type: GET_INSTRUCTOR,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Instructor Updated' : 'Instructor Created', 'success')
      );

      if (!edit) {
        navigate('/dashboard');
      }
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

// create new course from api/courses
export const createInstructor =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post('/instructors', formData);

      dispatch({
        type: CREATE_INSTRUCTOR_SUCCESS,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Instructor Updated' : 'Instructor Created', 'success')
      );

      if (!edit) {
        navigate('/dashboard');
      }
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
