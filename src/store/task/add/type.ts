import { TValueOrErrorType } from '../../type';

export interface IRequestTaskData {
  fields: {
    userId: TValueOrErrorType;
    typeId: TValueOrErrorType;
    article: TValueOrErrorType;
    dateStart: TValueOrErrorType;
    dateEnd: TValueOrErrorType;
  };
  productIds: number[];
  warehousePointIds: number[];
}
