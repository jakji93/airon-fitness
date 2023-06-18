import axios from 'axios';

const fetchFitnessPlan = () => (dispatch) => {
  dispatch({
    type: 'fitnessPlan/FETCH_FITNESS_PLAN_REQUESTED',
  });
  axios.get('api here')
    .then((response) => {
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

export default fetchFitnessPlan;
