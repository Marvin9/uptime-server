export { default as UptimeLoader } from './Loader';
export { plainLog, successLog, errorLog } from './logger';
export { RedirectWrapper } from './RedirectWrapper';

const oneHourInNanosecond = 3600000000000;

export const hoursToNanoseconds = (hours: number): number => {
  return hours * oneHourInNanosecond;
};
