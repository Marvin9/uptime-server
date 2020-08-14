import * as action from './actionTypes';

export const setAuthLoading = (t: boolean): action.SET_AUTH_LOADING => ({
  type: action.actionTypes.SET_AUTH_LOADING,
  payload: t,
});

export const redirectTo_ = (redirectTo: string): action.REDIRECT_TO => ({
  type: action.actionTypes.REDIRECT_TO,
  payload: redirectTo,
});

export const setAuthUserData = (payload: { email: string } | null): action.SET_AUTH_USER_DATA => ({
  type: action.actionTypes.SET_AUTH_USER_DATA,
  payload,
});

export const setAuthError = (error: string): action.SET_AUTH_ERROR => ({
  type: action.actionTypes.SET_AUTH_ERROR,
  payload: error,
});

export const loginUser = (email: string, password: string): action.LOGIN_USER => ({
  type: action.actionTypes.LOGIN_USER,
  payload: {
    email,
    password,
  },
});

export const registerUser = (email: string, password: string): action.REGISTER_USER => ({
  type: action.actionTypes.REGISTER_USER,
  payload: {
    email,
    password,
  },
});
