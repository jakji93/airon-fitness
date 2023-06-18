import { combineReducers } from 'redux';

import additionalProfileReducer from './AdditionalProfile';
import basicProfileReducer from './BasicProfile';
import fitnessPlanReducer from './FitnessPlan';
import hasFitnessPlan from './HasFitnessPlan';

const rootReducer = combineReducers({
  basicProfile: basicProfileReducer,
  additionalProfile: additionalProfileReducer,
  fitnessPlan: fitnessPlanReducer,
  hasFitnessPlan,
});

export default rootReducer;
