import { ITableObject } from '@components/table/type';

import { IField, TTaskType } from '../type';

export type ITasks = {
  [key in TTaskType]: ITask[];
};

export interface IOneTask {
  taskInfo: ITask;
  productIds: number[];
  floorInfo: ITaskFloorInfo[];
  pointIds: number[];
}

interface ITaskFloorInfo {
  floorId: number;
  occupiedSpace: number;
}

export interface ITask extends ITableObject {
  id: IField<number>;
  article: IField<string>;
  deadlines: IField<string>;
  timeStart: IField<string>;
  timeEnd: IField<string>;
  operatorLogin: IField<string>;
}

export interface IRequestTaskData {
  fields: IRequestTaskField;
  userId: number;
  type: TTaskType;
  productIds: number[];
  floorIds: number[];
  pointIds: number[];
}

export interface IRequestTaskField {
  id: string;
  article: string;
  timeStart: string;
  timeEnd: string;
}
