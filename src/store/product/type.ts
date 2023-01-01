import { ITableObject } from '../../components/blocks/table/type';

export interface TProductsData {
  data: IProduct[];
  tableHeader: string[];
  serviceInformation: IServiceProductInformation[];
}

export interface IOneProduct {
  productInfo: IProduct;
  pointId: number;
  serviceInformation: Omit<IServiceProductInformation, 'productId'>;
}

export interface IProduct extends ITableObject {
  id: number;
  article: string;
  title: string;
  author: string;
  yearOfPublication: string;
  number: number;
  printDate: string;
  printingHouse: string;
  publishingHouse: string;
  categoryTitle: string;
  categoryId: number;
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
