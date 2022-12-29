import { TValueOrErrorType } from '../../type';

export interface IRequestTaskData {
  fields: {
    id: TValueOrErrorType;
    userId: TValueOrErrorType;
    typeId: TValueOrErrorType;
    article: TValueOrErrorType;
    dateStart: TValueOrErrorType;
    dateEnd: TValueOrErrorType;
  };
  productIds: number[];
  warehousePointIds: number[];
}
