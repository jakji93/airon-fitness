import axios from 'axios';

import { createBearerTokenHeader } from './util';

/** Backend + local storage calls */

const getWorkoutAndMealSchedule = async () => {
  const workoutResponse = await axios.post(
    `${process.env.REACT_APP_SERVER_API_BASE}/workoutSchedule/`,
    {
      headers: createBearerTokenHeader,
    },
  );

  const mealResponse = await axios.post(
    `${process.env.REACT_APP_SERVER_API_BASE}/mealSchedule/`,
    {
      headers: createBearerTokenHeader,
    },
  );

  return {
    workoutSchedule: workoutResponse.data,
    mealSchedule: mealResponse.data,
  };
};

const createWorkoutAndMealSchedule = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_API_BASE}/mock/workoutMealSchedule/`,
    {
      headers: createBearerTokenHeader,
    },
  );

  return response.data;
};

const workoutAndMealScheduleService = {
  createWorkoutAndMealSchedule,
  getWorkoutAndMealSchedule,
};

export default workoutAndMealScheduleService;
