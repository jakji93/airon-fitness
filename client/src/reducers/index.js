import { combineReducers } from 'redux';

import additionalProfileReducer from './AdditionalProfile';
import authReducer from './Auth';
import basicProfileReducer from './BasicProfile';
import fitnessPlanReducer from './FitnessPlan';

const rootReducer = combineReducers({
  basicProfile: basicProfileReducer,
  additionalProfile: additionalProfileReducer,
  fitnessPlan: fitnessPlanReducer,
  auth: authReducer,
});

export default rootReducer;
