import { combineReducers } from 'redux';

import additionalProfileReducer from './AdditionalProfile';
import authReducer from './Auth';
import basicProfileReducer from './BasicProfile';
import fitnessPlanReducer from './FitnessPlan';
import mealPlanReducer from './MealPlan';
import signupReducer from './Signup';
import userProfileReducer from './UserProfile';

const rootReducer = combineReducers({
  basicProfile: basicProfileReducer,
  additionalProfile: additionalProfileReducer,
  fitnessPlan: fitnessPlanReducer,
  auth: authReducer,
  mealPlan: mealPlanReducer,
  signup: signupReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
