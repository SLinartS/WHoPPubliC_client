export type TAddedProductList = Array<IAddProductFormData>;

export interface IAddProductFormData {
  article: string;
  title: string;
  author: string;
  yearOfPublication: string;
  number: string;
  printDate: string;
  printingHouse: string;
  publishingHouse: string;
  categoryId: string;
}

export interface IAddedProductListForTableData {
  data: TAddedProductListForTable;
  tableHeader: Array<string>;
}

export type TAddedProductListForTable = Array<IAddProductForTable>;

export interface IAddProductForTable {
  article: string;
  title: string;
  author: string;
  categoryId: string;
  number: string;
  printingHouse: string;
  publishingHouse: string;
}
