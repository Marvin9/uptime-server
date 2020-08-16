import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'baseui/button';
import { H6 } from 'baseui/typography';
import { HeaderNavigation, ALIGN, StyledNavigationList } from 'baseui/header-navigation';

import rootReducer from '../../store/reducers';

interface HeaderType {
  email: string | undefined;
}

const Header: React.FC<HeaderType> = ({ email }) => (
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
      >
        Log out
      </Button>
    </StyledNavigationList>
  </HeaderNavigation>
);

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  email: state.AuthReducer.userData ? state.AuthReducer.userData.email : undefined,
});

export default connect(mapStateToProps)(Header);
