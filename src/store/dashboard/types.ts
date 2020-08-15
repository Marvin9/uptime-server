export type instance = {
  url: string;
  duration: number;
  unique_id: string;
};

export type report = {
  url: string;
  status: number;
  reported_at: Date;
};

export type reports = {
  [instanceId: string]: report[];
};

export type INIT_STATE_TYPE = {
  instances: instance[];
  initLoading: boolean;
  reports: reports;
};
