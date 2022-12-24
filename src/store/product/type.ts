import { ITableObject } from '../../components/blocks/table/type';

export interface TProductsData {
  data: IProduct[];
  tableHeader: string[];
  serviceInformation: IServiceProductInformation[];
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

export interface IServiceProductInformation {
  productId: number;
  isLinkedToTask: boolean;
  taskId: number;
}

export interface IProductResponse {
  message: string;
  productIds: number[];
}

export interface IProductTypeValues extends ITableObject {
  [key: string]: string | number;
}
