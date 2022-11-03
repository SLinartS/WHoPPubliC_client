export interface TProductsData {
  data: IProduct[];
  tableHeader: string[];
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
  productIds: number[];
}
