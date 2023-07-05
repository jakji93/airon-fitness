import axios from 'axios';

const API_URL = `${process.env.REACT_APP_SERVER_API_BASE}/userProfile/`;

const buildUserProfileRequestBody = (userData) => ({
  apiKey: userData.apiKey,
  firstName: userData.firstName,
  lastName: userData.lastName,
  image: userData.image,
  birthday: userData.birthday,
  gender: userData.gender,
  height: parseInt(userData.height, 10),
  heightUnit: userData.heightUnit,
  weight: parseInt(userData.weight, 10),
  weightUnit: userData.weightUnit,
  experience: userData.experience,
  bodyFat: parseInt(userData.bodyFat, 10),
  muscleMass: parseInt(userData.muscleMass, 10),
  duration: parseInt(userData.duration, 10),
  weeklyAvailability: parseInt(userData.weeklyAvailability, 10),
  preference: userData.preference,
  equipment: userData.equipment,
  allergies: userData.allergies,
  goals: userData.goals,
  healthConditions: userData.healthConditions,
  dietRestriction: userData.dietRestriction,
});

const createUserProfile = async (userData) => {
  const requestBody = buildUserProfileRequestBody(userData);

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) throw new Error('Cannot get user profile, user not logged in');

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  const response = await axios.post(API_URL, requestBody, { headers });

  return response.data;
};

const updateUserProfile = async (userData) => {
  const requestBody = buildUserProfileRequestBody(userData);

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) throw new Error('Cannot get user profile, user not logged in');

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  const response = await axios.put(API_URL, requestBody, { headers });

  return response.data;
};

const getUserProfile = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) throw new Error('Cannot get user profile, user not logged in');

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  const response = await axios.get(API_URL, { headers });
  return response.data;
};

const userProfileService = {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
};

export default userProfileService;
