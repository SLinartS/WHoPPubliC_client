import { ITableObject } from '../../components/blocks/table/type';

export type TTypeTaskStates = 'acceptanceList' | 'shipmentList';

export interface ITasks {
  data: ITask[];
  tableHeader: string[];
}

export interface IOneTask {
  taskInfo: ITask;
  productIds: number[];
  warehousePointIds: number[];
}

export interface ITask extends ITableObject {
  id: number;
  article: string;
  deadlines: string;
  dateStart: string;
  dateEnd: string;
  operatorLogin: string;
}
