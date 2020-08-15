import React from 'react';
import axios from 'axios';

import * as logger from '../../utils/logger';
import { APIList } from '../../global';

const Dashboard: React.FC = () => {
  React.useEffect(() => {
    logger.plainLog(`Fetching ${APIList.GET_REPORTS}`);
    axios
      .get(APIList.GET_REPORTS, { withCredentials: true })
      .then((response) => {
        logger.plainLog('Response: ');
        logger.plainLog(`${response}`);
      })
      .catch((e) => {
        logger.errorLog(Dashboard, e);
      });
  }, []);
  return <>Hello</>;
};

export default Dashboard;
