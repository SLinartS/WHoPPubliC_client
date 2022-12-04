import { TValueOrErrorType } from '../../../type';

export interface IProductFormDataFields {
  article: TValueOrErrorType;
  title: TValueOrErrorType;
  author: TValueOrErrorType;
  yearOfPublication: TValueOrErrorType;
  number: TValueOrErrorType;
  printDate: TValueOrErrorType;
  printingHouse: TValueOrErrorType;
  publishingHouse: TValueOrErrorType;
  categoryId: TValueOrErrorType;
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
