/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getErrorMessage } from './utils';
import workoutAndMealScheduleService from '../services/WorkoutAndMealScheduleService';

const initialState = {
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getWorkoutAndMealSchedule = createAsyncThunk(
  'workoutAndMealSchedule/getWorkoutAndMealSchedule',
  async (_, thunkAPI) => {
    try {
      return await workoutAndMealScheduleService.getWorkoutAndMealSchedule();
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createWorkoutAndMealSchedule = createAsyncThunk(
  'workoutAndMealSchedule/createWorkoutAndMealSchedule',
  async (_, thunkAPI) => {
    try {
      return await workoutAndMealScheduleService.createWorkoutAndMealSchedule();
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const WorkoutAndMealScheduleSlice = createSlice({
  name: 'workoutAndMealSchedule',
  initialState,
  reducers: {
    resetWorkoutAndMealScheduleStates: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutAndMealSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkoutAndMealSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getWorkoutAndMealSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.profile = null;
      })
      .addCase(createWorkoutAndMealSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkoutAndMealSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(createWorkoutAndMealSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.profile = null;
      });
  },
});

export const {
  resetWorkoutAndMealScheduleStates,
} = WorkoutAndMealScheduleSlice.actions;

export default WorkoutAndMealScheduleSlice.reducer;
