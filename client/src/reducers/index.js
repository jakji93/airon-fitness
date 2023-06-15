import { combineReducers } from 'redux';

import additionalProfileReducer from './AdditionalProfile';
import basicProfileReducer from './BasicProfile';

const rootReducer = combineReducers({
  basicProfile: basicProfileReducer,
  additionalProfile: additionalProfileReducer,
});

export default rootReducer;
