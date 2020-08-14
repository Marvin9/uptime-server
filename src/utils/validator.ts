export type authBodyWarning = {
  email: string | null;
  password: string | null;
};

// https://stackoverflow.com/a/46181
const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const authBodyValidator = (email: string, password: string): authBodyWarning => {
  const warning: authBodyWarning = {
    email: null,
    password: null,
  };
  if (!validateEmail(email)) {
    warning.email = 'Invalid email.';
  }

  // temporary password validation
  if (password.length < 3) {
    warning.password = 'Password length must be greater than 2.';
  }
  return warning;
};
