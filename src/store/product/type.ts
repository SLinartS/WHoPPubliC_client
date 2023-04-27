import { ITableObject } from '@components/table/type';
import { TProductFormDataFields } from '@store/popup/form/product/type';

import { IField } from '../type';

export interface TProductsData {
  data: IProductInfo[];
  serviceInformation: IServiceProductInformation[];
}

export interface IOneProduct {
  productInfo: IGeneralProductInformation & TVariousProductInformation;
  pointId: number;
  serviceInformation: Omit<IServiceProductInformation, 'productId'>;
}

export interface IProduct {
  general: IGeneralProductInformation;
  information: TVariousProductInformation;
}

export type IProductInfo = IGeneralProductInformation &
  TVariousProductInformation;

export interface IGeneralProductInformation extends ITableObject {
  id: IField<number>;
  article: IField<string>;
  title: IField<string>;
  number: IField<number>;
  imageUrl: IField<string>;
  note: IField<string>;
  categoryAlias: IField<string>;
  categoryId: IField<number>;
  typeAlias: IField<string>;
  typeId: IField<number>;
}

export type TVariousProductInformation = IProductBook | IProductMagazine;

export interface IProductBook {
  author: IField<string>;
  yearOfPublication: IField<string>;
  yearOfPrinting: IField<string>;
  printingHouse: IField<string>;
  publishingHouse: IField<string>;
}

export interface IProductMagazine {
  printingHouse: IField<string>;
  publishingHouse: IField<string>;
  dateOfPrinting: IField<string>;
}

export interface IServiceProductInformation {
  productId: number;
  taskId: number;
  floorIds: number[];
  actualFloorIds: number[];
  pointIds: number[];
}

export interface IProductResponse {
  message: string;
  productIds: number[];
}

export interface IRequestProduct {
  fields: TProductFormDataFields;
  pointId: number;
  userId: '1';
}

export interface IResponseApi {
  message: string;
}

export interface IMarkAsMovedRequestData {
  productId: number;
}
