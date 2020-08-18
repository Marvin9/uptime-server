export { default as UptimeLoader } from './Loader';
export { plainLog, successLog, errorLog } from './logger';
export { RedirectWrapper } from './RedirectWrapper';

const oneHourInNanosecond = 3600000000000;

export const hoursToNanoseconds = (hours: number): number => {
  return hours * oneHourInNanosecond;
};

const zeroPrefix = (n: number): string => (n > 9 ? `${n}` : `0${n}`);

export const formatDate = (dd: string): string => {
  const d = new Date(dd);
  const hours = zeroPrefix(d.getHours());
  const minute = zeroPrefix(d.getMinutes());
  const date = `${zeroPrefix(d.getDate())}/${zeroPrefix(d.getMonth())}/${d.getFullYear()}`;

  return `${date} - ${hours}:${minute}`;
};

export const isValidURL = (url: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
