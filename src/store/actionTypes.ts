import { instance, report, reports } from './dashboard/types';

export enum actionTypes {
  // authentication
  SET_AUTH_LOADING = 'SET_AUTH_LOADING',
  SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA',
  REGISTER_USER = 'REGISTER_USER',
  // saga
  LOGIN_USER = 'LOGIN_USER',
  SET_AUTH_ERROR = 'SET_AUTH_ERROR',

  // dashboard
  SET_DASHBOARD_INIT_LOADING = 'SET_DASHBOARD_INIT_LOADING',
  SET_DASHBOARD_INSTANCES = 'SET_DASHBOARD_INSTANCES',
  ADD_DASHBOARD_INSTANCE = 'ADD_DASHBOARD_INSTANCE',
  SET_DASHBOARD_INSTANCE_REPORTS = 'SET_DASHBOARD_INSTANCE_REPORTS',
  ADD_DASHBOARD_INSTANCE_REPORT = 'ADD_DASHBOARD_INSTANCE_REPORT',
  REMOVE_DASHBOARD_INSTANCE = 'REMOVE_DASHBOARD_INSTANCE',
  // saga
  INIT_DASHBOARD = 'INIT_DASHBOARD',

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

export interface ADD_DASHBOARD_INSTANCE_REPORT {
  type: actionTypes.ADD_DASHBOARD_INSTANCE_REPORT;
  payload: {
    instance_id: string;
    report: report;
  };
}

export interface SET_DASHBOARD_INSTANCE_REPORTS {
  type: actionTypes.SET_DASHBOARD_INSTANCE_REPORTS;
  payload: reports;
}

export interface SET_DASHBOARD_INIT_LOADING {
  type: actionTypes.SET_DASHBOARD_INIT_LOADING;
  payload: boolean;
}

export interface SET_DASHBOARD_INSTANCES {
  type: actionTypes.SET_DASHBOARD_INSTANCES;
  payload: instance[];
}

export interface ADD_DASHBOARD_INSTANCE {
  type: actionTypes.ADD_DASHBOARD_INSTANCE;
  payload: instance;
}

export interface REMOVE_DASHBOARD_INSTANCE {
  type: actionTypes.REMOVE_DASHBOARD_INSTANCE;
  payload: string;
}

export interface INIT_DASHBOARD {
  type: actionTypes.INIT_DASHBOARD;
}
