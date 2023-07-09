import axios from 'axios';

/** Backend + local storage calls */

const API_URL = `${process.env.REACT_APP_SERVER_API_BASE}/userInfo/`;

const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem('user');
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;
