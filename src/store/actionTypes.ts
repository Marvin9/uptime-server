export enum actionTypes {
  // authentication
  SET_AUTH_LOADING = 'SET_AUTH_LOADING',
  SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA',
  REGISTER_USER = 'REGISTER_USER',
  LOGIN_USER = 'LOGIN_USER',
  SET_AUTH_ERROR = 'SET_AUTH_ERROR',

  // misc
  REDIRECT_TO = 'REDIRECT_TO',
}

// action payloads
export interface SET_AUTH_LOADING {
  type: actionTypes.SET_AUTH_LOADING;
  payload: boolean;
}

export interface SET_AUTH_USER_DATA {
  type: actionTypes.SET_AUTH_USER_DATA;
  payload: {
    email: string;
  } | null;
}

export interface REDIRECT_TO {
  type: actionTypes.REDIRECT_TO;
  payload: string;
}

type authPayload = {
  email: string;
  password: string;
};

export interface LOGIN_USER {
  type: actionTypes.LOGIN_USER;
  payload: authPayload;
}

export interface REGISTER_USER {
  type: actionTypes.REGISTER_USER;
  payload: authPayload;
}

export interface SET_AUTH_ERROR {
  type: actionTypes.SET_AUTH_ERROR;
  payload: string;
}
