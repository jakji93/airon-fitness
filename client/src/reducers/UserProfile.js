/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getErrorMessage } from './utils';
import { HEIGHT_UNITS, WEIGHT_UNITS } from '../constants/BasicProfile';
import userProfileService from '../services/UserProfileService';

const initialUserProfile = {
  gender: '',
  firstName: '',
  lastName: '',
  birthday: null,
  weight: null,
  height: null,
  weightUnit: WEIGHT_UNITS.KG,
  heightUnit: HEIGHT_UNITS.IN,
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

const initialState = {
  profile: initialUserProfile,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create user profile
export const createUserProfile = createAsyncThunk(
  'userProfile/createUserProfile',
  async (userData, thunkAPI) => {
    try {
      return await userProfileService.createUserProfile(userData);
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// update user profile
export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async (userData, thunkAPI) => {
    try {
      return await userProfileService.updateUserProfile(userData);
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// get user profile
export const getUserProfile = createAsyncThunk(
  'userProfile/getUserProfile',
  async (userData, thunkAPI) => {
    try {
      return await userProfileService.getUserProfile();
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    resetUserProfile: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.profile = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.profile = null;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.profile = null;
      });
  },
});

export const { resetUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
