import { IProductFormData } from '../../../store/form/product/type';

export interface IProductListForTableData {
  data: Array<IProductForTable>;
  tableHeader: Array<string>;
}

export interface IProductForTable
  extends Omit<IProductFormData, 'yearOfPublication' | 'printDate'> {}
