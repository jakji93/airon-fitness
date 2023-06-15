/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import {
  EXPERIENCE_OPTIONS, GENDER_OPTIONS, HEIGHT_UNITS, WEIGHT_UNITS,
} from '../constants';

const basicInfoSlice = createSlice({
  name: 'basicInfo',
  initialState: {
    firstName: '',
    lastName: '',
    dateOfBirth: dayjs('2001-02-23'),
    gender: GENDER_OPTIONS.PREFER_NOT_TO_SAY,
    weight: {
      value: 0,
      unit: WEIGHT_UNITS.KG,
    },
    height: {
      value: 0,
      unit: HEIGHT_UNITS.IN,
    },
    experience: EXPERIENCE_OPTIONS.BEGINNER,
    goals: [],
  },
  reducers: {
    updateFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action) => {
      state.lastName = action.payload;
    },
    updateDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    updateGender: (state, action) => {
      state.gender = action.payload;
    },
    updateWeight: (state, action) => {
      state.weight = action.payload;
    },
    updateHeight: (state, action) => {
      state.height = action.payload;
    },
    updateExperience: (state, action) => {
      state.experience = action.payload;
    },
    updateGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
});

export const {
  updateFirstName,
  updateLastName,
  updateDateOfBirth,
  updateGender,
  updateWeight,
  updateHeight,
  updateExperience,
  updateGoals,
} = basicInfoSlice.actions;

export default basicInfoSlice.reducer;
