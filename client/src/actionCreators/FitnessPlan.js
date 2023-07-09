import axios from 'axios';

export const fetchFitnessPlan = () => (dispatch) => {
  dispatch({
    type: 'fitnessPlan/FETCH_FITNESS_PLAN_REQUESTED',
  });
  axios.get('http://localhost:3001/workoutSchedule')
    .then((response) => {
      console.log(response);
      dispatch({
        type: 'fitnessPlan/FETCH_FITNESS_PLAN_SUCCESS',
        payload: response.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: 'fitnessPlan/FETCH_FITNESS_PLAN_ERROR',
        payload: e.message,
      });
    });
};

export const createFitnessPlan = () => (dispatch) => {
  dispatch({
    type: 'fitnessPlan/FETCH_FITNESS_PLAN_REQUESTED',
  });
  axios.post('http://localhost:3001/workoutSchedule')
    .then((response) => {
      console.log(response);
      dispatch({
        type: 'fitnessPlan/FETCH_FITNESS_PLAN_SUCCESS',
        payload: response.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: 'fitnessPlan/FETCH_FITNESS_PLAN_ERROR',
        payload: e.message,
      });
    });
};
