/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    bodyFatPercentage: 0,
    muscleMassPercentage: 0,
    healthConditionsInjuries: [],
    dietaryRestrictions: [],
    allergiesIntolerances: [],
    weeklyAvailability: [],
    workoutDuration: 0,
    exercisePreferences: [],
    equipmentAvailability: [],
  },
  reducers: {
    updateBodyFatPercentage: (state, action) => {
      state.bodyFatPercentage = action.payload;
    },
    updateMuscleMassPercentage: (state, action) => {
      state.muscleMassPercentage = action.payload;
    },
    updateHealthConditionsInjuries: (state, action) => {
      state.healthConditionsInjuries = action.payload;
    },
    updateDietaryRestrictions: (state, action) => {
      state.dietaryRestrictions = action.payload;
    },
    updateAllergiesIntolerances: (state, action) => {
      state.allergiesIntolerances = action.payload;
    },
    updateWeeklyAvailability: (state, action) => {
      state.weeklyAvailability = action.payload;
    },
    updateWorkoutDuration: (state, action) => {
      state.workoutDuration = action.payload;
    },
    updateExercisePreferences: (state, action) => {
      state.exercisePreferences = action.payload;
    },
    updateEquipmentAvailability: (state, action) => {
      state.equipmentAvailability = action.payload;
    },
    updateAdditionalProfile: (state, action) => {
      state = action.payload;
    },
  },
});

export const {
  updateBodyFatPercentage,
  updateMuscleMassPercentage,
  updateHealthConditionsInjuries,
  updateDietaryRestrictions,
  updateAllergiesIntolerances,
  updateWorkoutDuration,
  updateExercisePreferences,
  updateEquipmentAvailability,
} = profileSlice.actions;

export default profileSlice.reducer;
