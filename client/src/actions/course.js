import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_COURSE,
  COURSE_ERROR,
  COURSE_DELETED,
  COURSE_SELECTED,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_SUCCESS,
  COURSE_UPDATED,
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
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create new course from api/courses
export const createCourse = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/courses', formData);

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Course Created', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CREATE_COURSE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update course by ID from api/course/:course_id
export const updateCourse = (id, formData, navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/courses/${id}`, formData);

    dispatch({
      type: COURSE_UPDATED,
      payload: res.data,
    });

    dispatch(setAlert('Course Edited', 'success'));

    navigate('/dashboard');
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

// Delete course from api/courses
export const selectedCourse = (courseSelected) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_SELECTED,
      payload: courseSelected,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
