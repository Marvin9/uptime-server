import { all } from 'redux-saga/effects';

import AuthSaga from './auth/saga';
import DashboardSaga from './dashboard/saga';

export default function* rootSaga() {
  yield all([AuthSaga(), DashboardSaga()]);
}
