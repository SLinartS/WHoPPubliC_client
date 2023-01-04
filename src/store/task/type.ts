import { ITableObject } from '../../components/blocks/table/type';
import { IField } from '../type';

export type TTypeTaskStates = 'acceptanceList' | 'shipmentList';

export interface ITasks {
  data: ITask[];
}

export interface IOneTask {
  taskInfo: ITask;
  productIds: number[];
  warehousePointIds: number[];
}

export interface ITask extends ITableObject {
  id: IField<number>;
  article: IField<string>;
  deadlines: IField<string>;
  dateStart: IField<string>;
  dateEnd: IField<string>;
  operatorLogin: IField<string>;
}
