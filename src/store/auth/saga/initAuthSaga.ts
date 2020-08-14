import { call, put } from 'redux-saga/effects';

import { routes } from '../../../routes';
import { errorLog } from '../../../utils';
import { pingAuth } from '../../../api';

import { setAuthLoading, redirectTo_, setAuthUserData } from '../../actions';

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

    yield put(setAuthUserData(payload));

    yield put(redirectTo_(redirectTo));
  } catch (e) {
    errorLog(initAuthSaga, e);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export default initAuthSaga;
