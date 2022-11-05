export type TStatus = 'pending' | 'done' | 'error';
export type TTaskType = 'acceptance' | 'shipment';
export type TValueOrErrorType = {
  value: string;
  errors: string[];
};
