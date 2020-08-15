import { call, put, takeLatest } from 'redux-saga/effects';

import * as logger from '../../../utils/logger';
import { initDashboardAPI } from '../../../api';
import { routes } from '../../../routes';

import * as actions from '../../actions';
import { actionTypes } from '../../actionTypes';

import { instance, reports as rp } from '../types';

function* initDashboardWorker() {
  yield put(actions.setDashboardLoading(true));
  logger.plainLog('Initiating dashboard');

  const dashboardData = yield call(initDashboardAPI);
  if (dashboardData) {
    const instances = dashboardData.instances as instance[];
    const reports = dashboardData.reports as rp;

    yield put(actions.setDashboardInstances(instances));
    yield put(actions.setDashboardReports(reports));

    logger.successLog(initDashboardWorker);
  } else {
    yield put(actions.redirectTo_(routes.AUTH_PAGE));
  }

  yield put(actions.setDashboardLoading(false));
}

function* initDashboardSaga() {
  yield takeLatest(actionTypes.INIT_DASHBOARD, initDashboardWorker);
}

export default initDashboardSaga;
