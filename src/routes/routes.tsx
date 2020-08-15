import React from 'react';
import { Route } from 'react-router-dom';

import { AuthenticationPage, Dashboard } from '../pages';

export const Pages = () => (
  <>
    <Route path="/auth">
      <AuthenticationPage />
    </Route>
    <Route path="/" exact>
      <Dashboard />
    </Route>
  </>
);
