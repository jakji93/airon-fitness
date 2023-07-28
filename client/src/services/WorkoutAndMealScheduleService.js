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

const createWorkoutAndMealSchedule = async () => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/mock/workoutMealSchedule/`;

  const response = await axios.post(apiUrl, {}, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const updateWorkoutSchedule = async () => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/mock/workoutSchedule/`;

  const response = await axios.put(apiUrl, {}, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const updateMealSchedule = async () => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/mock/mealSchedule/`;

  const response = await axios.put(apiUrl, {}, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const workoutAndMealScheduleService = {
  createWorkoutAndMealSchedule,
  getWorkoutAndMealSchedule,
  updateWorkoutSchedule,
  updateMealSchedule,
};

export default workoutAndMealScheduleService;
