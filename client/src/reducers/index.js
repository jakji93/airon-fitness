import { combineReducers } from 'redux';

import authReducer from './Auth';
import fitnessPlanReducer from './FitnessPlan';
import mealPlanReducer from './MealPlan';
import signupReducer from './Signup';
import userProfileReducer from './UserProfile';

const rootReducer = combineReducers({
  fitnessPlan: fitnessPlanReducer,
  auth: authReducer,
  mealPlan: mealPlanReducer,
  signup: signupReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
