/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getErrorMessage } from './utils';
import userProfileService from '../services/UserProfileService';

const initialState = {
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create user profile
export const registerUserProfile = createAsyncThunk(
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

// Update Profile Image
export const updateUserProfileImage = createAsyncThunk(
  'userProfile/updateUserProfileImage',
  async (file, thunkAPI) => {
    try {
      return await userProfileService.updateProfileImage(file);
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
    resetUserProfileStates: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    logoutUserProfile: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(registerUserProfile.rejected, (state, action) => {
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
      .addCase(updateUserProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateUserProfileImage.rejected, (state, action) => {
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

export const { resetUserProfileStates, logoutUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
