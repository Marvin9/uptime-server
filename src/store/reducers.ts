import { combineReducers } from 'redux';

import AuthReducer from './auth/reducer';
import RedirectReducer from './redirect/reducer';

const rootReducer = combineReducers({ AuthReducer, RedirectReducer });

export default rootReducer;
