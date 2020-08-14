import React from 'react';
import { connect } from 'react-redux';

import rootReducer from './store/reducers';

import { UptimeLoader, RedirectWrapper } from './utils';

interface AppType {
  loading: boolean;
}

const App: React.FC<AppType> = ({ loading }) => (
  <>
    {console.log(loading)}
    <RedirectWrapper />
    {loading && <UptimeLoader />}
  </>
);

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  loading: state.AuthReducer.authLoading,
});

export default connect(mapStateToProps)(App);
