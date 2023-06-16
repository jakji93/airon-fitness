import { combineReducers } from 'redux';

import additionalProfileReducer from './AdditionalProfile';
import basicProfileReducer from './BasicProfile';
import fitnessPlanReducer from './FitnessPlan';

const rootReducer = combineReducers({
  basicProfile: basicProfileReducer,
  additionalProfile: additionalProfileReducer,
  fitnessPlan: fitnessPlanReducer,
});

export default rootReducer;
