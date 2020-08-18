import axios from 'axios';

import { AuthType } from './index';

import { plainLog, successLog, errorLog } from '../utils';
import { APIList } from '../global';

type AuthRequest = {
  email: string;
  password: string;
};

type AuthResponse = {
  error: boolean;
  message: string;
};

export const authUser = (
  email: string,
  password: string,
  type: AuthType,
): Promise<string | null> => {
  const useAPI = type === AuthType.LOGIN ? APIList.LOGIN : APIList.REGISTER;
  plainLog(`${type} - ${useAPI}`);
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post(
        useAPI,
        {
          email,
          password,
        } as AuthRequest,
        {
          withCredentials: true,
        },
      );
      const data = response.data as AuthResponse;
      if (response.status !== 200 || data.error) {
        plainLog(data.message);
        if (response.status === 409) {
          resolve('Email already exists.');
          return;
        }
        resolve(data.message);
      } else {
        successLog(authUser);
        resolve(null);
      }
    } catch (e) {
      errorLog(authUser, e);
      if (type === AuthType.LOGIN) {
        resolve('Invalid credentials.');
        return;
      }
      resolve('User already exists.');
    }
  });
};
