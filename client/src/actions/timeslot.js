import api from '../utils/api';
import { setAlert } from './alert';
import { GET_TIMESLOT, TIMESLOT_ERROR } from './types';

// Get all scheduled classes from api/schedule
export const getTimeslots = () => async (dispatch) => {
  try {
    const res = await api.get('/timeslots');
    dispatch({
      type: GET_TIMESLOT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TIMESLOT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
