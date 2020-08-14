import React from 'react';
import { Route } from 'react-router-dom';

import { AuthenticationPage } from '../pages';

export const Pages = () => (
  <>
    <Route path="/auth">
      <AuthenticationPage />
    </Route>
  </>
);
