/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { HEIGHT_UNITS, WEIGHT_UNITS } from '../constants/BasicProfile';

// Get user from localStorage
const signup = JSON.parse(localStorage.getItem('signup'));

const initialSignupUser = {
  gender: '',
  firstName: '',
  lastName: '',
  birthday: null,
  weight: null,
  height: null,
  weightUnits: WEIGHT_UNITS.KG,
  heightUnits: HEIGHT_UNITS.IN,
  experience: '',
  goals: [],
  apiKey: '',
  healthConditionsAndInjuries: [],
  dietaryRestrictions: [],
  allergiesIntolerances: [],
  weeklyAvailability: null,
  bodyFatPercentage: null,
  muscleMassPercentage: null,
  workoutDuration: null,
  exercisePreferences: ['e.g. Squat'],
  equipmentAvailability: ['e.g. Dumbbells'],
};

const initialState = signup || {
  user: initialSignupUser,
  step: 0,
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignup: (state, action) => {
      state.step = action.payload.step;
      state.user = {
        ...state.user,
        ...action.payload.user,
      };
      localStorage.setItem('signup', JSON.stringify(state));
    },
    removeSignup: (state) => {
      localStorage.removeItem('signup');
      state.step = 0;
      state.user = initialSignupUser;
    },
  },
});

export const { setSignup, removeSignup } = signupSlice.actions;
export default signupSlice.reducer;
