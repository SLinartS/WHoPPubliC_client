import { ITableObject } from '../../../../components/blocks/table/type';
import { IProductFormFields } from '../productList/type';

export interface IProductForTable
  extends ITableObject,
    Omit<IProductFormFields, 'yearOfPublication' | 'printDate'> {
  id: number;
}

export interface IProductListForTableData {
  data: IProductForTable[];
  tableHeader: string[];
}
