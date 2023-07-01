import axios from 'axios';

const fetchMealPlan = () => (dispatch) => {
  dispatch({
    type: 'mealPlan/FETCH_MEAL_PLAN_REQUESTED',
  });
  axios.get('api here')
    .then((response) => {
      dispatch({
        type: 'mealPlan/FETCH_MEAL_PLAN_SUCCESS',
        payload: response.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: 'mealPlan/FETCH_MEAL_PLAN_ERROR',
        payload: e.message,
      });
    });
};

export default fetchMealPlan;
