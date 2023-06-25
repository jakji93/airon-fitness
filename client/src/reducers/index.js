import { combineReducers } from 'redux';

import additionalProfileReducer from './AdditionalProfile';
import authReducer from './Auth';
import basicProfileReducer from './BasicProfile';
import fitnessPlanReducer from './FitnessPlan';
import mealPlanReducer from './MealPlan';

const rootReducer = combineReducers({
  basicProfile: basicProfileReducer,
  additionalProfile: additionalProfileReducer,
  fitnessPlan: fitnessPlanReducer,
  auth: authReducer,
  mealPlan: mealPlanReducer,
});

export default rootReducer;
