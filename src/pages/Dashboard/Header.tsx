import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'baseui/button';
import { H6 } from 'baseui/typography';
import { HeaderNavigation, ALIGN, StyledNavigationList } from 'baseui/header-navigation';

import { APIList } from '../../global';
import { routes } from '../../routes';
import { errorLog } from '../../utils';

import rootReducer from '../../store/reducers';
import { redirectTo_ } from '../../store/actions';
import { REDIRECT_TO } from '../../store/actionTypes';

interface HeaderType {
  email: string | undefined;
  logoutRedirect(): void;
}

const Header: React.FC<HeaderType> = ({ email, logoutRedirect }) => {
  const [logoutLoading, updateLogoutLoading] = useState(false);

  const logout = async () => {
    updateLogoutLoading(true);
    try {
      await axios.post(APIList.LOGOUT, null, { withCredentials: true });
      logoutRedirect();
    } catch (e) {
      errorLog(Header, e);
    } finally {
      updateLogoutLoading(false);
    }
  };

  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: {
            height: '80px',
          },
        },
      }}
    >
      <StyledNavigationList $align={ALIGN.center}>
        <H6
          overrides={{
            Block: {
              style: {
                lineHeight: 0,
                marginTop: 'auto',
                marginBottom: 'auto',
              },
            },
          }}
        >
          {email}
        </H6>
        <Button
          overrides={{
            BaseButton: {
              style: {
                height: '50px',
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: '50px',
              },
            },
          }}
          isLoading={logoutLoading}
          onClick={logout}
        >
          Log out
        </Button>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  email: state.AuthReducer.userData ? state.AuthReducer.userData.email : undefined,
});

const mapDispatchToProps = (dispatch: Dispatch<REDIRECT_TO>) => ({
  logoutRedirect: () => dispatch(redirectTo_(routes.AUTH_PAGE)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
