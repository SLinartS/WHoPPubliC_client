import { TValueOrErrorType } from '../../../type';

export type TProductFormDataFields = IProductGeneralDataFields &
  TProductVariousDataFields;

export interface IProductGeneralDataFields {
  id: TValueOrErrorType;
  article: TValueOrErrorType;
  number: TValueOrErrorType;
  categoryId: TValueOrErrorType;
}

export type TProductVariousDataFieldsWords =
  | keyof IProductBookDataFields
  | keyof IProductMagazineDataFields
  | keyof IProductBookletDataFields;

export type TProductVariousDataFields = IProductBookDataFields &
  IProductMagazineDataFields &
  IProductBookletDataFields;

export interface IProductBookDataFields {
  title: TValueOrErrorType;
  author: TValueOrErrorType;
  yearOfPublication: TValueOrErrorType;
  yearOfPrinting: TValueOrErrorType;
  printingHouse: TValueOrErrorType;
  publishingHouse: TValueOrErrorType;
}

export interface IProductMagazineDataFields {
  title: TValueOrErrorType;
  yearOfPublication: TValueOrErrorType;
  printingHouse: TValueOrErrorType;
  publishingHouse: TValueOrErrorType;
}

export interface IProductBookletDataFields {
  title: TValueOrErrorType;
  author: TValueOrErrorType;
  printingHouse: TValueOrErrorType;
  publishingHouse: TValueOrErrorType;
}

export interface IFile {
  value: File | null;
  errors: string[];
}
