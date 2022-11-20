import { ITableObject } from '../../components/blocks/table/type';
import { ITaskFormDataArrays } from '../form/task/array/type';
import { TValueOrErrorType } from '../type';

export type TTypeTaskStates = 'acceptanceList' | 'shipmentList';

export interface ITasks {
  data: ITask[];
  tableHeader: string[];
}

export interface ITask extends ITableObject {
  id: number;
  article: string;
  deadlines: string;
  dateStart: string;
  dateEnd: string;
  operatorLogin: string;
}

export interface INewTaskData {
  fields: {
    userId: TValueOrErrorType;
    typeId: TValueOrErrorType;
    article: TValueOrErrorType;
    dateStart: TValueOrErrorType;
    dateEnd: TValueOrErrorType;
  };
  arrays: ITaskFormDataArrays;
}
