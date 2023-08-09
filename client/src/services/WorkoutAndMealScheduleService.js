import axios from 'axios';

import { createBearerTokenHeader } from './util';

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

const getWorkoutSchedule = async () => {
  const workoutResponse = await axios.get(`${process.env.REACT_APP_SERVER_API_BASE}/workoutSchedule/`, {
    headers: createBearerTokenHeader(),
  });

  return {
    workoutSchedule: workoutResponse.data,
  };
};

const getMealSchedule = async () => {
  const workoutResponse = await axios.get(`${process.env.REACT_APP_SERVER_API_BASE}/mealSchedule/`, {
    headers: createBearerTokenHeader(),
  });

  return {
    mealSchedule: workoutResponse.data,
  };
};

const createWorkoutAndMealSchedule = async () => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/userProfile/generate/`;

  const response = await axios.post(apiUrl, {}, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const createWorkoutSchedule = async () => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/workoutSchedule/`;

  const response = await axios.post(apiUrl, {}, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const createMealSchedule = async () => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/mealSchedule/`;

  const response = await axios.post(apiUrl, {}, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const updateWorkoutSchedule = async (customInput) => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/workoutSchedule/`;

  const response = await axios.put(apiUrl, { customInput }, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const updateMealSchedule = async (customInput) => {
  const apiUrl = `${process.env.REACT_APP_SERVER_API_BASE}/mealSchedule/`;

  const response = await axios.put(apiUrl, { customInput }, {
    headers: createBearerTokenHeader(),
  });

  return response.data;
};

const workoutAndMealScheduleService = {
  createWorkoutAndMealSchedule,
  getWorkoutAndMealSchedule,
  getWorkoutSchedule,
  getMealSchedule,
  createWorkoutSchedule,
  createMealSchedule,
  updateWorkoutSchedule,
  updateMealSchedule,
};

export default workoutAndMealScheduleService;
