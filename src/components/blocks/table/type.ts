import {
  IAddProductForTable,
  TAddedPoductListForTable,
} from '../../../store/form/addProductForm/type';
import { IProduct, TProducts } from '../../../store/products/type';
import { ITask, TTasks } from '../../../store/tasks/type';

export interface ITableProps {
  data: TTasks | TProducts | TAddedPoductListForTable;
  tableHeader: Array<string>;
  additionalСlasses?: string;
}

export interface IRowProps {
  columns: ITask | IProduct | IAddProductForTable;
}

export type TDataTableProps = Array<IDataTable>;

export interface IDataTable {
  [key: string]: string | number;
}

export interface TableColumnProps {
  additionalСlasses?: string;
  text: number | string;
}
