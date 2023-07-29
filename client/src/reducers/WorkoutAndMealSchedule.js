/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getErrorMessage } from './utils';
import workoutAndMealScheduleService from '../services/WorkoutAndMealScheduleService';

const initialState = {
  workoutSchedule: null,
  mealSchedule: null,
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

export const getWorkoutSchedule = createAsyncThunk(
  'workoutAndMealSchedule/getWorkoutSchedule',
  async (_, thunkAPI) => {
    try {
      return await workoutAndMealScheduleService.getWorkoutSchedule();
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getMealSchedule = createAsyncThunk(
  'workoutAndMealSchedule/getMealSchedule',
  async (_, thunkAPI) => {
    try {
      return await workoutAndMealScheduleService.getMealSchedule();
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

export const createWorkoutSchedule = createAsyncThunk(
  'workoutAndMealSchedule/createWorkoutSchedule',
  async (_, thunkAPI) => {
    try {
      return await workoutAndMealScheduleService.createWorkoutSchedule();
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createMealSchedule = createAsyncThunk(
  'workoutAndMealSchedule/createMealSchedule',
  async (_, thunkAPI) => {
    try {
      return await workoutAndMealScheduleService.createMealSchedule();
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateWorkoutSchedule = createAsyncThunk(
  'workoutAndMealSchedule/updateWorkoutSchedule',
  async (input, thunkAPI) => {
    try {
      return await workoutAndMealScheduleService.updateWorkoutSchedule(input);
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateMealSchedule = createAsyncThunk(
  'workoutAndMealSchedule/updateMealSchedule',
  async (input, thunkAPI) => {
    try {
      return await workoutAndMealScheduleService.updateMealSchedule(input);
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
    resetScheduleState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutAndMealSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkoutAndMealSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Your schedules have been loaded!';
        state.workoutSchedule = action.payload.workoutSchedule;
        state.mealSchedule = action.payload.mealSchedule;
      })
      .addCase(getWorkoutAndMealSchedule.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = null;
      })
      .addCase(createWorkoutAndMealSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkoutAndMealSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Your schedule has been created!';
        state.workoutSchedule = action.payload.workoutSchedule;
        state.mealSchedule = action.payload.mealSchedule;
      })
      .addCase(createWorkoutAndMealSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.profile = null;
      })
      .addCase(getWorkoutSchedule.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Please create a schedule!';
        state.profile = null;
        state.isError = true;
      })
      .addCase(getWorkoutSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'Your schedule has been loaded!';
        state.workoutSchedule = action.payload.workoutSchedule;
      })
      .addCase(getMealSchedule.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Please create a schedule!';
        state.profile = null;
        state.isError = true;
      })
      .addCase(getMealSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'Your schedule has been loaded!';
        state.mealSchedule = action.payload.mealSchedule;
      })
      .addCase(createWorkoutSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'Your schedule has been created!';
        state.workoutSchedule = action.payload;
      })
      .addCase(createMealSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'Your schedule has been created!';
        state.mealSchedule = action.payload;
      })
      .addCase(createWorkoutSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createMealSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateWorkoutSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'Your schedule has been created!';
        state.workoutSchedule = action.payload;
      })
      .addCase(updateMealSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'Your schedule has been created!';
        state.mealSchedule = action.payload;
      })
      .addCase(updateWorkoutSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMealSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  resetWorkoutAndMealScheduleStates,
  resetScheduleState,
} = WorkoutAndMealScheduleSlice.actions;

export default WorkoutAndMealScheduleSlice.reducer;
