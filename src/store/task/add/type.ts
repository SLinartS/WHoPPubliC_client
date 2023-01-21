import { TValueOrErrorType } from '../../type';

export interface IRequestTaskData {
  fields: {
    id: TValueOrErrorType;
    article: TValueOrErrorType;
    dateStart: TValueOrErrorType;
    dateEnd: TValueOrErrorType;
  };
  userId: number;
  typeId: number;
  productIds: number[];
  floorIds: number[];
  pointIds: number[];
}
