import { call, put, takeLatest } from 'redux-saga/effects';

import { successLog } from '../../../utils';

import * as actions from '../../actions';
import * as at from '../../actionTypes';
import { actionTypes } from '../../actionTypes';

import { authUser, AuthType } from '../../../api';

function* registerWorker(action: at.REGISTER_USER) {
  yield put(actions.setAuthLoading(true));
  const payload = action.payload;
  const { email, password } = payload;

  const registerErrorMessage = yield call(authUser, email, password, AuthType.REGISTER);
  if (registerErrorMessage) {
    yield put(actions.setAuthError(registerErrorMessage));
    yield put(actions.setAuthLoading(false));
  } else {
    yield put(actions.loginUser(email, password));
    successLog(registerWorker);
  }
}

function* registerSaga() {
  yield takeLatest(actionTypes.REGISTER_USER, registerWorker);
}

export default registerSaga;
