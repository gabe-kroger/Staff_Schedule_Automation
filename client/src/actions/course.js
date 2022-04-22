import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_COURSE,
  COURSE_ERROR,
  COURSE_DELETED,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_SUCCESS,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get all Courses from api/courses
export const getCourses = () => async (dispatch) => {
  try {
    const res = await api.get('/courses'); //this is our res variable which contains data from api/courses

    dispatch({
      type: GET_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
    });
  }
};

// create new course from api/courses
export const createCourse =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post('/courses', formData);

      dispatch({
        type: GET_COURSE,
        payload: res.data,
      });

      dispatch(setAlert(edit ? 'Course Updated' : 'Course Created', 'success'));

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: COURSE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// update course by ID from api/courses/:course_id
export const updateCourse =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.put('/courses/:course_id', formData);

      dispatch({
        type: GET_COURSE,
        payload: res.data,
      });

      dispatch(setAlert(edit ? 'Course Updated' : 'Course Created', 'success'));

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: COURSE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// delete course from api/courses
export const deleteCourse = (id) => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete this course? This can NOT be undone!'
    )
  ) {
    try {
      await api.delete(`courses/${id}`);

      dispatch({ type: COURSE_DELETED });

      dispatch(setAlert('This course has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
