export interface INIT_STATE_TYPE {
  isLoggedIn: boolean;
  userData: userDataType | null;
  authLoading: boolean;
}

export type userDataType = {
  email: string;
};
