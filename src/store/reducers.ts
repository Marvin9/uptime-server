import { combineReducers } from 'redux';

import AuthReducer from './auth/reducer';
import DashboardReducer from './dashboard/reducer';
import RedirectReducer from './redirect/reducer';

const rootReducer = combineReducers({ AuthReducer, DashboardReducer, RedirectReducer });

export default rootReducer;
