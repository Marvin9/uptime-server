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

        const normalizedReports: reports = {};
        reportsResponseData.data.forEach((report) => {
          const _report = { ...report };
          delete _report.instance_id;
          if (normalizedReports[report.instance_id]) {
            normalizedReports[report.instance_id].push(_report);
          } else {
            normalizedReports[report.instance_id] = [_report];
          }
        });

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
