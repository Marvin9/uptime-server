export interface INIT_STATE_TYPE {
  isLoggedIn: boolean;
  userData: userDataType | null;
  authLoading: boolean;
  authError: string;
}

export type userDataType = {
  email: string;
};
