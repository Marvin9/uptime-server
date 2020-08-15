import * as action from './actionTypes';

import * as dashboard from './dashboard/types';

import { routes } from '../routes';

export const setAuthLoading = (t: boolean): action.SET_AUTH_LOADING => ({
  type: action.actionTypes.SET_AUTH_LOADING,
  payload: t,
});

export const redirectTo_ = (redirectTo: routes): action.REDIRECT_TO => ({
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

export const setDashboardLoading = (is: boolean): action.SET_DASHBOARD_INIT_LOADING => ({
  type: action.actionTypes.SET_DASHBOARD_INIT_LOADING,
  payload: is,
});

export const setDashboardInstances = (
  instances: dashboard.instance[],
): action.SET_DASHBOARD_INSTANCES => ({
  type: action.actionTypes.SET_DASHBOARD_INSTANCES,
  payload: instances,
});

export const setDashboardReports = (
  reports: dashboard.reports,
): action.SET_DASHBOARD_INSTANCE_REPORTS => ({
  type: action.actionTypes.SET_DASHBOARD_INSTANCE_REPORTS,
  payload: reports,
});

export const addDashboardInstance = (
  instance: dashboard.instance,
): action.ADD_DASHBOARD_INSTANCE => ({
  type: action.actionTypes.ADD_DASHBOARD_INSTANCE,
  payload: instance,
});

export const addDashboardReport = (
  instanceId: string,
  report: dashboard.report,
): action.ADD_DASHBOARD_INSTANCE_REPORT => ({
  type: action.actionTypes.ADD_DASHBOARD_INSTANCE_REPORT,
  payload: {
    instance_id: instanceId,
    report,
  },
});

export const removeDashboardInstance = (instanceId: string): action.REMOVE_DASHBOARD_INSTANCE => ({
  type: action.actionTypes.REMOVE_DASHBOARD_INSTANCE,
  payload: instanceId,
});

export const initDashboard = (): action.INIT_DASHBOARD => ({
  type: action.actionTypes.INIT_DASHBOARD,
});
