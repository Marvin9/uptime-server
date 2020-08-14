export enum actionTypes {
  // authentication
  SET_AUTH_LOADING = 'SET_AUTH_LOADING',
  SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA',

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
