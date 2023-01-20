import { ITableObject } from '../../components/blocks/table/type';
import { IField, TTaskType } from '../type';

export type ITasks = {
  [key in TTaskType]: ITask[];
};

export interface IOneTask {
  taskInfo: ITask;
  productIds: number[];
  floorIds: number[];
}

export interface ITask extends ITableObject {
  id: IField<number>;
  article: IField<string>;
  deadlines: IField<string>;
  dateStart: IField<string>;
  dateEnd: IField<string>;
  operatorLogin: IField<string>;
}
