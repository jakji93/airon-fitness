import { combineReducers } from 'redux';

import authReducer from './Auth';
import signupReducer from './Signup';
import userProfileReducer from './UserProfile';
import workoutAndMealScheduleReducer from './WorkoutAndMealSchedule';

const rootReducer = combineReducers({
  workoutAndMealSchedule: workoutAndMealScheduleReducer,
  auth: authReducer,
  signup: signupReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
