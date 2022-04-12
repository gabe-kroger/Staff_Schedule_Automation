import api from '../utils/api';
import { setAlert } from './alert';
import { GET_COURSE, COURSE_ERROR, COURSE_DELETED } from './types';

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

// delete course from api/courses
export const deleteCourse = () => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete this course? This can NOT be undone!'
    )
  ) {
    try {
      await api.delete('/courses');

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
