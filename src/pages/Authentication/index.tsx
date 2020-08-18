import React, { useState, Dispatch } from 'react';
import { connect } from 'react-redux';
import { H4, Label4 } from 'baseui/typography';
import { Card, StyledBody } from 'baseui/card';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button, KIND } from 'baseui/button';

import rootReducer from '../../store/reducers';
import * as at from '../../store/actionTypes';
import * as actions from '../../store/actions';
import * as validator from '../../utils/validator';

import { AuthType } from '../../api';

type oringActions = at.LOGIN_USER | at.REGISTER_USER;

interface AuthenticationPageType {
  authError: string;
  authUser: (email: string, password: string, type: AuthType) => void;
}

const AuthenticationPage: React.FC<AuthenticationPageType> = ({ authUser, authError }) => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  const [warning, updateWarning] = useState<validator.authBodyWarning>({
    email: null,
    password: null,
  });

  const handleAuth = (type: AuthType) => {
    const notValid = validator.authBodyValidator(email, password);
    updateWarning(notValid);
    if (notValid.email || notValid.password) {
      return;
    }

    authUser(email, password, type);
  };

  return (
    <>
      <H4
        overrides={{
          Block: {
            style: {
              textAlign: 'center',
            },
          },
        }}
      >
        <u>Login/Register to Uptime server.</u>
      </H4>
      <br />
      <Card
        overrides={{
          Root: {
            style: {
              width: '30%',
              margin: '0 auto',
            },
          },
        }}
      >
        <StyledBody>
          <FormControl label={() => 'email'} caption={() => warning.email}>
            <Input
              value={email}
              onChange={(e) => updateEmail((e.target as HTMLInputElement).value)}
              placeholder="hii@foo.com"
            />
          </FormControl>
          <FormControl label={() => 'password'} caption={() => warning.password}>
            <Input
              value={password}
              onChange={(e) => updatePassword((e.target as HTMLInputElement).value)}
              placeholder="password"
              type="password"
            />
          </FormControl>
          {authError && <Label4>{authError}</Label4>}
          <Button
            overrides={{
              BaseButton: {
                style: {
                  width: '100%',
                  marginTop: '10px',
                },
              },
            }}
            onClick={() => handleAuth(AuthType.LOGIN)}
          >
            Log in
          </Button>
          <Button
            overrides={{
              BaseButton: {
                style: {
                  width: '100%',
                  marginTop: '10px',
                },
              },
            }}
            kind={KIND.secondary}
            onClick={() => handleAuth(AuthType.REGISTER)}
          >
            Register
          </Button>
        </StyledBody>
      </Card>
    </>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  authError: state.AuthReducer.authError,
});

const mapDispatchToProps = (dispatch: Dispatch<oringActions>) => ({
  authUser: (email: string, password: string, type: AuthType) => {
    if (type === AuthType.LOGIN) {
      return dispatch(actions.loginUser(email, password));
    }
    return dispatch(actions.registerUser(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPage);
