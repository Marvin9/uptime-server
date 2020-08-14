import { INIT_STATE_TYPE } from './types';

import { SET_AUTH_LOADING, SET_AUTH_USER_DATA, SET_AUTH_ERROR, actionTypes } from '../actionTypes';

const INIT_STATE: INIT_STATE_TYPE = {
  isLoggedIn: false,
  userData: null,
  authLoading: false,
  authError: '',
};

const AuthReducer = (
  state: INIT_STATE_TYPE = INIT_STATE,
  action: SET_AUTH_LOADING | SET_AUTH_USER_DATA | SET_AUTH_ERROR,
): INIT_STATE_TYPE => {
  switch (action.type) {
    case actionTypes.SET_AUTH_LOADING:
      state = {
        ...state,
        authLoading: action.payload,
      };
      break;
    case actionTypes.SET_AUTH_USER_DATA:
      if (action.payload) {
        state = {
          ...state,
          userData: action.payload,
          isLoggedIn: true,
        };
      } else {
        state = {
          ...state,
          userData: null,
          isLoggedIn: false,
        };
      }
      break;
    case actionTypes.SET_AUTH_ERROR:
      state = {
        ...state,
        authError: action.payload,
      };
      break;
  }
  return state;
};

export default AuthReducer;
