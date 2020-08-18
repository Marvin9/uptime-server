/* eslint-disable no-useless-return */
import axios from 'axios';

import { instance, report, reports } from '../store/dashboard/types';
import * as logger from '../utils/logger';
import { APIList } from '../global';

interface _report extends report {
  instance_id: string;
}

type InstanceResponse = {
  error: boolean;
  data: instance[];
};

type ReportsResonse = {
  error: boolean;
  data: _report[];
};

const normalizeReports = (reports: _report[]): reports => {
  const normalizedReports: reports = {};
  reports.forEach((report) => {
    const _report = { ...report };
    delete _report.instance_id;

    if (normalizedReports[report.instance_id]) {
      normalizedReports[report.instance_id].push(_report);
    } else {
      normalizedReports[report.instance_id] = [_report];
    }
  });
  return normalizedReports;
};

export const initDashboardAPI = (): Promise<{ instances: instance[]; reports: reports } | null> => {
  return new Promise((resolve) => {
    const getInstances = axios.get(APIList.GET_INSTANCES, { withCredentials: true });
    const getReports = axios.get(APIList.GET_REPORT, { withCredentials: true });

    Promise.all([getInstances, getReports])
      .then((responses) => {
        const instanceResponse = responses[0];
        const reportsResponse = responses[1];

        if (instanceResponse.status === 401 || reportsResponse.status === 401) {
          resolve(null);
          return;
        }

        const instanceResponseData = instanceResponse.data as InstanceResponse;
        const reportsResponseData = reportsResponse.data as ReportsResonse;

        const normalizedReports = normalizeReports(reportsResponseData.data);

        resolve({
          instances: instanceResponseData.data,
          reports: normalizedReports,
        });
      })
      .catch((e) => {
        logger.errorLog(initDashboardAPI, e);
        resolve(null);
      });
  });
};

type AddInstanceRequest = {
  url: string;
  duration: number;
};

type AddInstanceResponse = {
  error: boolean;
  data: string;
};

export const addInstanceAPI = (
  url: string,
  durationInNanoseconds: number,
): Promise<{
  error: boolean;
  status: number;
  data: string | null;
}> => {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post(
        APIList.ADD_INSTANCE,
        {
          url,
          duration: durationInNanoseconds,
        } as AddInstanceRequest,
        { withCredentials: true },
      );

      if (response.status !== 200) {
        logger.plainLog('Add instance error response: ');
        console.log(response.data);
        logger.plainLog('');
        resolve({
          error: true,
          status: response.status,
          data: response.data,
        });
        return;
      }

      const respData = response.data as AddInstanceResponse;
      resolve({
        error: false,
        status: response.status,
        data: respData.data,
      });
    } catch (e) {
      logger.errorLog(addInstanceAPI, e);
      resolve({
        error: true,
        status: 401,
        data: null,
      });
    }
  });
};

type RemoveInstanceRequest = {
  instance_id: string;
};

export const removeInstanceAPI = (instanceId: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.delete(APIList.ADD_INSTANCE, {
        data: {
          instance_id: instanceId,
        } as RemoveInstanceRequest,
        withCredentials: true,
      });

      if (response.status === 200) {
        logger.successLog(removeInstanceAPI);
        resolve(true);
      } else {
        logger.plainLog(`Response: ${response.status}`);
        console.log(response.data);
        logger.plainLog('');
        resolve(false);
      }
    } catch (e) {
      resolve(false);
    }
  });
};

export const getReportsAPI = (): Promise<reports | null> => {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.get(APIList.GET_REPORT, { withCredentials: true });

      const responseData = response.data as ReportsResonse;

      resolve(normalizeReports(responseData.data));
    } catch (e) {
      resolve(null);
    }
  });
};
