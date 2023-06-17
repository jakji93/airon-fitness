import axios from 'axios';

const fetchBasicProfile = () => (dispatch) => {
  dispatch({
    type: 'basicProfile/FETCH_BASIC_PROFILE_REQUESTED',
  });
  axios.get('api here')
    .then((response) => {
      dispatch({
        type: 'basicProfile/FETCH_BASIC_PROFILE_SUCCESS',
        payload: response.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: 'basicProfile/FETCH_BASIC_PROFILE_ERROR',
        payload: e.message,
      });
    });
};

export default fetchBasicProfile;
