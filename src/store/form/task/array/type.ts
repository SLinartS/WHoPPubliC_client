import { TArrayOrErrorType } from '../../../type';

export interface ITaskFormDataArrays {
  products: TArrayOrErrorType;
  warehousePoints: TArrayOrErrorType;
}

export interface ITaskFormArrays {
  products: number[];
  points: number[];
  warehousePoints: IWarehousePoint[];
}

export interface IWarehousePoint {
  zoneId: number;
  sectionId: number;
  blockId: number;
  floorId: number;
}
