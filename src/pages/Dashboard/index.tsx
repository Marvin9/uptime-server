import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';

import rootReducer from '../../store/reducers';

import { initDashboard } from '../../store/actions';
import { INIT_DASHBOARD } from '../../store/actionTypes';

import Header from './Header';
import Body from './Body';

import Loader from '../../utils/Loader';

interface DashboardType {
  initDashboard(): void;
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardType> = ({ initDashboard, isLoading }) => {
  useEffect(() => {
    initDashboard();
  }, []);
  return (
    <>
      <Header />
      {isLoading ? <Loader size={30} /> : <Body />}
    </>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  isLoading: state.DashboardReducer.initLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<INIT_DASHBOARD>) => ({
  initDashboard: () => dispatch(initDashboard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
