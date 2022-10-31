import { ChangeEvent } from 'react';
import { IPoint } from '../point/type';

export type TChangeFieldEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export interface IAddTaskFormDataArrays {
  products: Array<string>;
  points: Array<IPoint>;
  warehousePoints: Array<IWarehousePoint>;
}

export interface IAddTaskFormDataFields {
  title: string;
  dateStart: string;
  dateEnd: string;
  userId: string;
}

export interface IAddProductFormData {
  article: string;
  title: string;
  author: string;
  category: string;
  yearOfPublication: string;
  number: string;
  printDate: string;
  printingHouse: string;
  publishingHouse: string;
  userId: string;
  stored: string;
  taskTitle: string;
}

export interface IWarehousePoint {
  zoneId: number;
  sectionId: number;
  blockId: number;
  floorId: number;
}

export type TTaskType = 'acceptance' | 'shipment';

