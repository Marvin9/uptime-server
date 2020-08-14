import { call, put, takeLatest } from 'redux-saga/effects';

import { plainLog, successLog } from '../../../utils';
import { authUser, AuthType } from '../../../api';
import * as at from '../../actionTypes';
import { actionTypes } from '../../actionTypes';

import * as actions from '../../actions';
import { routes } from '../../../routes';

function* loginWorker(action: at.LOGIN_USER) {
  yield put(actions.setAuthLoading(true));
  const payload = action.payload;
  const { email, password } = payload;
  plainLog(`Login: ${email} - ${password}`);

  const loginErrorMessage = yield call(authUser, email, password, AuthType.LOGIN);
  if (loginErrorMessage) {
    yield put(actions.setAuthError(loginErrorMessage));
  } else {
    yield put(actions.setAuthUserData({ email }));
    yield put(actions.redirectTo_(routes.DASHBOARD_PAGE));
    successLog(loginWorker);
  }
  yield put(actions.setAuthLoading(false));
}

function* loginSaga() {
  yield takeLatest(actionTypes.LOGIN_USER, loginWorker);
}

export default loginSaga;
