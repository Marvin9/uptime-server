import { all, fork } from 'redux-saga/effects';

import initDashboard from './saga/initDashboardSaga';

function* DashboardSaga() {
  yield all([fork(initDashboard)]);
}

export default DashboardSaga;
