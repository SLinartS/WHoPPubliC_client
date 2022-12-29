export type TStatus = 'pending' | 'done' | 'error';
export type TTaskType = 'acceptance' | 'shipment';
export type TActionTaskType = 'create' | 'change';
export type TValueOrErrorType = {
  value: string;
  errors: string[];
};

export type TArrayOrErrorType = {
  value: number[];
  errors: string[];
};
