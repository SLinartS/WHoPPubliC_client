import { IProductFormDataFields } from '../product/type';

export interface IProductFormList {
  fields: IProductFormDataFields;
  points: number[];
}

export interface IProductFormFields {
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
