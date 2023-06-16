/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialPlan = {
  Monday: [{
    exercise: 'Barbell Squats',
    sets: 3,
    reps: 10,
    rest: 60,
    duration: null,
    intensity: 75,
  },
  {
    exercise: 'Bench Press',
    sets: 3,
    reps: 10,
    rest: 60,
    duration: null,
    intensity: 75,
  },
  {
    exercise: 'Lat Pulldowns',
    sets: 3,
    reps: 12,
    rest: 60,
    duration: null,
    intensity: 70,
  },
  {
    exercise: 'Plank',
    sets: 3,
    reps: 60,
    rest: 30,
    duration: null,
    intensity: 60,
  }],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

// TODO: when api setup, change the initial state to empty
const fitnessPlanSlice = createSlice({
  name: 'fitnessPlan',
  initialState: {
    loading: false,
    error: '',
    plan: initialPlan,
  },
  reducers: {
    FETCH_FITNESS_PLAN_REQUESTED: (state) => {
      state.loading = true;
    },
    FETCH_FITNESS_PLAN_SUCCESS: (state, action) => {
      state.loading = false;
      state.plan = action.payload;
      state.error = '';
    },
    FETCH_FITNESS_PLAN_ERROR: (state, action) => {
      state.loading = false;
      state.plan = fitnessPlanSlice.getInitialState().plan;
      state.error = action.payload;
    },
  },
});

export const {
  FETCH_FITNESS_PLAN_REQUESTED,
  FETCH_FITNESS_PLAN_SUCCESS,
  FETCH_FITNESS_PLAN_ERROR,
} = fitnessPlanSlice.actions;

export default fitnessPlanSlice.reducer;
