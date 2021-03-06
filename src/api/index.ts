export enum AuthType {
  LOGIN,
  REGISTER,
}

export { pingAuth } from './pingAuth';
export { authUser } from './auth';
export { initDashboardAPI, addInstanceAPI, removeInstanceAPI, getReportsAPI } from './dashboard';
