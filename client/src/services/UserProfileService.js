import axios from 'axios';

import { createBearerTokenHeader } from './util';

const API_URL = `${process.env.REACT_APP_SERVER_API_BASE}/userProfile/`;

const buildUserProfileRequestBody = (userData) => {
  const requestBody = {};
  if (userData.apiKey) requestBody.apiKey = userData.apiKey;
  if (userData.firstName) requestBody.firstName = userData.firstName;
  if (userData.lastName) requestBody.lastName = userData.lastName;
  if (userData.image) requestBody.image = userData.image;
  if (userData.birthday) requestBody.birthday = userData.birthday;
  if (userData.gender) requestBody.gender = userData.gender;
  if (userData.height) requestBody.height = parseInt(userData.height, 10);
  if (userData.heightUnit) requestBody.heightUnit = userData.heightUnit;
  if (userData.weight) requestBody.weight = parseInt(userData.weight, 10);
  if (userData.weightUnit) requestBody.weightUnit = userData.weightUnit;
  if (userData.experience) requestBody.experience = userData.experience;
  if (userData.bodyFat) requestBody.bodyFat = parseInt(userData.bodyFat, 10);
  if (userData.muscleMass) requestBody.muscleMass = parseInt(userData.muscleMass, 10);
  if (userData.duration) requestBody.duration = parseInt(userData.duration, 10);
  if (userData.weeklyAvailability) {
    requestBody.weeklyAvailability = parseInt(userData.weeklyAvailability, 10);
  }
  if (userData.preference) requestBody.preference = userData.preference;
  if (userData.equipment) requestBody.equipment = userData.equipment;
  if (userData.allergies) requestBody.allergies = userData.allergies;
  if (userData.goals) requestBody.goals = userData.goals;
  if (userData.healthConditions) requestBody.healthConditions = userData.healthConditions;
  if (userData.dietRestriction) requestBody.dietRestriction = userData.dietRestriction;
  if (userData.profileImage) requestBody.profileImage = userData.profileImage;

  return requestBody;
};

const createUserProfile = async (userData) => {
  const requestBody = buildUserProfileRequestBody(userData);

  const response = await axios.post(API_URL, requestBody, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const updateUserProfile = async (userData) => {
  const requestBody = buildUserProfileRequestBody(userData);

  const response = await axios.put(API_URL, requestBody, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const getUserProfile = async () => {
  const response = await axios.get(API_URL, {
    headers: createBearerTokenHeader(),
  });
  return response.data;
};

const updateProfileImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...createBearerTokenHeader(),
    },
  };
  const response = await axios.put(API_URL, formData, config);
  return response.data;
};

const userProfileService = {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
};

export default userProfileService;
