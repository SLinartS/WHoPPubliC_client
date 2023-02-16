export type TStatus = 'pending' | 'during' | 'done' | 'error';
export type TTaskType = 'acceptance' | 'shipment' | 'intra';
export type TPointType = 'acceptance' | 'shipment';
export type TActionType = 'create' | 'update';
export type TValueOrErrorType = {
  value: string;
  errors: string[];
};

export interface IField<T> {
  value: T;
  alias: string;
}

export type TArrayOrErrorType = {
  value: number[];
  errors: string[];
};

export interface IResponseApi {
  message: string;
}
