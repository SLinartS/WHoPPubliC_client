import { ITableObject } from '../../components/blocks/table/type';
import { IField, TTaskType } from '../type';

export type ITasks = {
  [key in TTaskType]: ITask[];
};

export interface IOneTask {
  taskInfo: ITask;
  productIds: number[];
  floorIds: number[];
  pointIds: number[];
}

export interface ITask extends ITableObject {
  id: IField<number>;
  article: IField<string>;
  deadlines: IField<string>;
  timeStart: IField<string>;
  timeEnd: IField<string>;
  operatorLogin: IField<string>;
}
