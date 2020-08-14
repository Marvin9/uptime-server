import { all, fork } from 'redux-saga/effects';

import initAuthSaga from './saga/initAuthSaga';
import loginSaga from './saga/loginSaga';
import registerSaga from './saga/registerSaga';

function* AuthSaga() {
  yield all([initAuthSaga(), fork(loginSaga), fork(registerSaga)]);
}

export default AuthSaga;
