export interface TProductsData {
  data: Array<IProduct>;
  tableHeader: Array<string>;
}

export interface IProduct {
  id: number;
  article: string;
  title: string;
  author: string;
  yearOfPublication: number;
  category: string;
  number: number;
  printDate: string;
}

export interface IProductResponse {
  message: string;
  productIds: Array<number>;
}
