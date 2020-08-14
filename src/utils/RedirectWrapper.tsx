import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import rootReducer from '../store/reducers';

interface _RedirectTypes {
  to: string | null;
}

const _Redirect: React.FC<_RedirectTypes> = ({ to }) => {
  if (to) {
    return <Redirect to={{ pathname: to }} />;
  }

  return null;
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  to: state.RedirectReducer.to,
});

export const RedirectWrapper = connect(mapStateToProps)(_Redirect);
