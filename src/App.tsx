import React from 'react';
import { connect } from 'react-redux';

import rootReducer from './store/reducers';

import { UptimeLoader, RedirectWrapper } from './utils';

import { Pages } from './routes/routes';

interface AppType {
  loading: boolean;
}

const App: React.FC<AppType> = ({ loading }) => (
  <>
    {loading && <UptimeLoader />}
    {!loading && <Pages />}
    <RedirectWrapper />
  </>
);

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  loading: state.AuthReducer.authLoading,
});

export default connect(mapStateToProps)(App);
