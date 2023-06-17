import axios from 'axios';

const fetchAdditionalProfile = () => (dispatch) => {
  dispatch({
    type: 'additionalProfile/FETCH_ADDITIONAL_PROFILE_REQUESTED',
  });
  axios.get('api here')
    .then((response) => {
      dispatch({
        type: 'additionalProfile/FETCH_ADDITIONAL_PROFILE_SUCCESS',
        payload: response.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: 'additionalProfile/FETCH_ADDITIONAL_PROFILE_ERROR',
        payload: e.message,
      });
    });
};

export default fetchAdditionalProfile;
