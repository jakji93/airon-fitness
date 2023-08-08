/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { HEIGHT_UNITS, WEIGHT_UNITS } from '../constants/BasicProfile';

const signup = JSON.parse(localStorage.getItem('signup'));

const initialSignupUser = {
  gender: '',
  firstName: '',
  lastName: '',
  birthday: dayjs().format('YYYY-MM-DD'),
  weight: null,
  height: null,
  weightUnit: WEIGHT_UNITS.KG,
  heightUnit: HEIGHT_UNITS.CM,
  experience: '',
  goals: [],
  apiKey: '',
  healthConditions: [],
  dietRestrictions: [],
  allergies: [],
  weeklyAvailability: null,
  bodyFat: null,
  muscleMass: null,
  duration: null,
  preference: ['e.g. Squat'],
  equipment: ['e.g. Dumbbells'],
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
