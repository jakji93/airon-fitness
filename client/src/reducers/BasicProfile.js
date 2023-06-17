/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import {
  EXPERIENCE_OPTIONS, GENDER_OPTIONS, GOAL_OPTIONS, HEIGHT_UNITS, WEIGHT_UNITS,
} from '../constants/BasicProfile';

// TODO: when api setup, change the initial state to empty
const basicProfileSlice = createSlice({
  name: 'basicProfile',
  initialState: {
    loading: false,
    error: '',
    profile: {
      firstName: 'test',
      lastName: 'test',
      dateOfBirth: '2001-02-23',
      gender: GENDER_OPTIONS.PREFER_NOT_TO_SAY,
      weight: {
        value: 123,
        unit: WEIGHT_UNITS.KG,
      },
      height: {
        value: 123,
        unit: HEIGHT_UNITS.IN,
      },
      experience: EXPERIENCE_OPTIONS.BEGINNER,
      goals: [GOAL_OPTIONS.ENDURANCE, GOAL_OPTIONS.MUSCLE_GROWTH],
    },
  },
  reducers: {
    FETCH_BASIC_PROFILE_REQUESTED: (state) => {
      state.loading = true;
    },
    FETCH_BASIC_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = '';
    },
    FETCH_BASIC_PROFILE_ERROR: (state, action) => {
      state.loading = false;
      state.profile = basicProfileSlice.getInitialState().profile;
      state.error = action.payload;
    },
  },
});

export const {
  FETCH_BASIC_PROFILE_REQUESTED,
  FETCH_BASIC_PROFILE_SUCCESS,
  FETCH_BASIC_PROFILE_ERROR,
} = basicProfileSlice.actions;

export default basicProfileSlice.reducer;
