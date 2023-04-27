import { TValueOrErrorType } from '../../../type';

export type TProductFormDataFields = IProductGeneralDataFields &
  TProductVariousDataFields;

export interface IProductGeneralDataFields {
  id: TValueOrErrorType;
  title: TValueOrErrorType;
  article: TValueOrErrorType;
  number: TValueOrErrorType;
  categoryId: TValueOrErrorType;
  typeId: TValueOrErrorType;
}

export type TProductVariousDataFieldsWords =
  | keyof IProductBookDataFields
  | keyof IProductMagazineDataFields;

export type TProductVariousDataFields = IProductBookDataFields &
  IProductMagazineDataFields;

export interface IProductBookDataFields {
  author: TValueOrErrorType;
  yearOfPublication: TValueOrErrorType;
  yearOfPrinting: TValueOrErrorType;
  printingHouse: TValueOrErrorType;
  publishingHouse: TValueOrErrorType;
}

export interface IProductMagazineDataFields {
  printingHouse: TValueOrErrorType;
  publishingHouse: TValueOrErrorType;
  dateOfPrinting: TValueOrErrorType;
}

export interface IFile {
  value: File | null;
  errors: string[];
}
