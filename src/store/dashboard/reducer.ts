import { INIT_STATE_TYPE } from './types';

import {
  actionTypes,
  SET_DASHBOARD_INIT_LOADING,
  SET_DASHBOARD_INSTANCES,
  SET_DASHBOARD_INSTANCE_REPORTS,
  ADD_DASHBOARD_INSTANCE,
  ADD_DASHBOARD_INSTANCE_REPORT,
  REMOVE_DASHBOARD_INSTANCE,
} from '../actionTypes';

const INIT_STATE: INIT_STATE_TYPE = {
  instances: [],
  initLoading: false,
  reports: {},
};

const dashboardReducer = (
  state = INIT_STATE,
  action:
    | SET_DASHBOARD_INIT_LOADING
    | SET_DASHBOARD_INSTANCES
    | SET_DASHBOARD_INSTANCE_REPORTS
    | ADD_DASHBOARD_INSTANCE
    | ADD_DASHBOARD_INSTANCE_REPORT
    | REMOVE_DASHBOARD_INSTANCE,
): INIT_STATE_TYPE => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARD_INIT_LOADING:
      state = {
        ...state,
        initLoading: action.payload,
      };
      break;

    case actionTypes.SET_DASHBOARD_INSTANCES:
      state = {
        ...state,
        instances: action.payload,
      };
      break;

    case actionTypes.ADD_DASHBOARD_INSTANCE:
      state = {
        ...state,
        instances: [...state.instances, action.payload],
      };
      break;

    case actionTypes.REMOVE_DASHBOARD_INSTANCE: {
      const instanceId = action.payload;
      const updatedInstances = state.instances.filter(
        (instance) => instance.unique_id !== instanceId,
      );
      const updatedReports = { ...state.reports };
      delete updatedReports[instanceId];

      state = {
        ...state,
        instances: updatedInstances,
        reports: updatedReports,
      };
      break;
    }

    case actionTypes.SET_DASHBOARD_INSTANCE_REPORTS:
      state = {
        ...state,
        reports: action.payload,
      };
      break;

    case actionTypes.ADD_DASHBOARD_INSTANCE_REPORT:
      state = {
        ...state,
        reports: {
          ...state.reports,
          [action.payload.instance_id]: [
            ...state.reports[action.payload.instance_id],
            action.payload.report,
          ],
        },
      };
      break;
  }
  return state;
};

export default dashboardReducer;
