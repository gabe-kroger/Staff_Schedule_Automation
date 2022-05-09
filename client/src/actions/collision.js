import api from '../utils/api';
import { setAlert } from './alert';
import { GET_COLLISION, COLLISION_ERROR, GENERATE_COLLISION } from './types';

// Get all scheduled classes from api/schedule
export const getCollisions = () => async (dispatch) => {
  try {
    const res = await api.get('/collisions');
    dispatch({
      type: GET_COLLISION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COLLISION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// generate schedule
export const generateCollisions = () => async (dispatch) => {
  try {
    const res = await api.post(`collisions/check`);

    dispatch({
      type: GENERATE_COLLISION,
      payload: res.data,
    });

    dispatch(setAlert('Generating schedule'));
  } catch (err) {
    dispatch({
      type: COLLISION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
