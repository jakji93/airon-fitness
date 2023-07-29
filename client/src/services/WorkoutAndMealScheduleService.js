import axios from 'axios';

import { createBearerTokenHeader } from './util';

/** Backend + local storage calls */

const getWorkoutAndMealSchedule = async () => {
  const workoutResponse = await axios.get(`${process.env.REACT_APP_SERVER_API_BASE}/workoutSchedule/`, {
    headers: createBearerTokenHeader(),
  });

  const mealResponse = await axios.get(`${process.env.REACT_APP_SERVER_API_BASE}/mealSchedule/`, {
    headers: createBearerTokenHeader(),
  });

  return {
    workoutSchedule: workoutResponse.data,
    mealSchedule: mealResponse.data,
  };
};

const getPaginatedWorkoutAndMealSchedule = async (page) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_API_BASE}/mock/workoutMealSchedule/all`, { page }, {
    headers: createBearerTokenHeader(),
  });

  return {
    response,
  };
};

const createWorkoutAndMealSchedule = async () => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/userProfile/generate/`;

  const response = await axios.post(apiUrl, {}, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const workoutAndMealScheduleService = {
  createWorkoutAndMealSchedule,
  getWorkoutAndMealSchedule,
  getPaginatedWorkoutAndMealSchedule,
};

export default workoutAndMealScheduleService;
