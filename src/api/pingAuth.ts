import axios from 'axios';

import { plainLog, successLog } from '../utils';
import { APIBase } from '../global';

type pingAuthResponse = {
  error: boolean;
  data: {
    email: string;
  };
};

export const pingAuth = (): Promise<string | null> => {
  return new Promise(async (resolve) => {
    plainLog('pinging /auth/ping');
    try {
      const response = await axios.get(`${APIBase}/auth/ping`, { withCredentials: true });

      if (response.status === 200) {
        const data = response.data as pingAuthResponse;
        resolve(data.data.email);
        successLog(pingAuth);
      } else {
        resolve(null);
      }
    } catch (e) {
      resolve(null);
    }
  });
};
