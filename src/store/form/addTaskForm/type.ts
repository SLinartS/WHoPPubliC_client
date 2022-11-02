import { ChangeEvent } from 'react';

export type TChangeFieldEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export interface IAddTaskFormDataArrays {
  products: Array<number>;
  points: Array<number>;
  warehousePoints: Array<IWarehousePoint>;
}

export interface IAddTaskFormDataFields {
  article: string;
  dateStart: string;
  dateEnd: string;
}

export interface IWarehousePoint {
  zoneId: number;
  sectionId: number;
  blockId: number;
  floorId: number;
}

export type TTaskType = 'acceptance' | 'shipment';

