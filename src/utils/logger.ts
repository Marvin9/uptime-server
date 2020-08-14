const log = process.env.NODE_ENV === 'development' ? console.log : () => false;

const pre = `\n[${new Date()}]:\t`;
const post = '\n\n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type func = (...args) => any;

export const plainLog = (message: string): void => {
  log(`${pre}${message}${post}`);
};

export const successLog = (func: func): void => {
  log(`${pre}${func.name} - SUCCESS${post}`);
};

export const errorLog = (func: func, err: Error): void => {
  log(`${pre}${func.name} - ERROR\n`);
  log(`Message: ${err.message}\n`);
  log(`Stack: ${err.stack}${post}`);
};
