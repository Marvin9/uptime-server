import { call, put } from 'redux-saga/effects';

import { routes } from '../../routes';
import { errorLog } from '../../utils';
import { pingAuth } from '../../api';

import * as action from '../actionTypes';

const setAuthLoading = (t: boolean): action.SET_AUTH_LOADING => ({
  type: action.actionTypes.SET_AUTH_LOADING,
  payload: t,
});

const redirectTo_ = (redirectTo: string): action.REDIRECT_TO => ({
  type: action.actionTypes.REDIRECT_TO,
  payload: redirectTo,
});

function* initAuthSaga() {
  yield put(setAuthLoading(true));
  try {
    const isAuthorized = yield call(pingAuth);
    let payload: {
      email: string;
    } | null;
    let redirectTo: string;

    if (isAuthorized) {
      redirectTo = routes.DASHBOARD_PAGE;
      payload = {
        email: isAuthorized,
      };
    } else {
      redirectTo = routes.AUTH_PAGE;
      payload = null;
    }

    yield put({
      type: action.actionTypes.SET_AUTH_USER_DATA,
      payload,
    } as action.SET_AUTH_USER_DATA);

    yield put(redirectTo_(redirectTo));
  } catch (e) {
    errorLog(initAuthSaga, e);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export default initAuthSaga;
