import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_SCHEDULE,
  SCHEDULE_ERROR,
  SCHEDULE_DELETED,
  CREATE_SCHEDULE_FAIL,
  CREATE_SCHEDULE_SUCCESS,
} from './types';

// Get all scheduled classes from api/schedule
export const getSchedules = () => async (dispatch) => {
  try {
    const res = await api.get('/schedule');
    dispatch({
      type: GET_SCHEDULE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SCHEDULE_ERROR,
    });
  }
};

// create new schedule from api/courses
export const createSchedule =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post('/schedule', formData);

      dispatch({
        type: CREATE_SCHEDULE_SUCCESS,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Schedule Added' : 'Schedule Created', 'success')
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
        type: CREATE_SCHEDULE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// update schedule by ID from api/schedule/:schedule_id
export const updateSchedule =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.put('/schedule/:schedule_id', formData);

      dispatch({
        type: GET_SCHEDULE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Schedule Updated' : 'Schedule Created', 'success')
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
        type: SCHEDULE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// delete schedule from api/schedule
export const deleteSchedule = (id) => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete this schedule? This can NOT be undone!'
    )
  ) {
    try {
      await api.delete(`schedule/${id}`);

      dispatch({ type: SCHEDULE_DELETED });

      dispatch(setAlert('This course has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: SCHEDULE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// generate schedule
export const generateSchedule = () => async (dispatch) => {
  try {
    const res = await api.post(`schedule/generate`);
    dispatch({
      payload: { msg: 'generatign schedule' },
    });
    dispatch(setAlert('Generating schedule'));
  } catch (err) {
    dispatch({
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
