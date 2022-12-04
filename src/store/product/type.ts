import { ITableObject } from '../../components/blocks/table/type';

export interface TProductsData {
  data: IProduct[];
  tableHeader: string[];
}

export interface IProduct extends ITableObject {
  id: number;
  article: string;
  title: string;
  author: string;
  category: string;
  number: number;
  printDate: string;
}

export interface IProductResponse {
  message: string;
  productIds: number[];
}

export interface IProductTypeValues extends ITableObject {
  [key: string]: string | number;
}
