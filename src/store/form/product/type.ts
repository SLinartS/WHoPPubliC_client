export interface IProductFormData {
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
  data: Array<IProductForTable>;
  tableHeader: Array<string>;
}

export interface IProductForTable
  extends Omit<IProductFormData, 'yearOfPublication' | 'printDate'> {}
