export type TAddedProductList = Array<IAddProductFormData>;

export interface IAddProductFormData {
  article: string;
  title: string;
  author: string;
  category: string;
  yearOfPublication: string;
  number: string;
  printDate: string;
  printingHouse: string;
  publishingHouse: string;
  userId: string;
}

export type TAddedPoductListForTable = Array<IAddProductForTable>;

export interface IAddProductForTable {
  article: string;
  title: string;
  author: string;
  category: string;
  number: string;
  printingHouse: string;
  publishingHouse: string;
}
