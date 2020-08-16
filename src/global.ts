export const APIBase = 'http://localhost:8000';

export const APIList = {
  LOGIN: `${APIBase}/auth/login`,
  REGISTER: `${APIBase}/auth/register`,
  LOGOUT: `${APIBase}/auth/logout`,
  GET_REPORT: `${APIBase}/api/report`,
  GET_INSTANCES: `${APIBase}/api/instances`,
  ADD_INSTANCE: `${APIBase}/api/instance`,
};
