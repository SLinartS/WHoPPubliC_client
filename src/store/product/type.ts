import { ITableObject } from '@components/table/type';
import { IProductFormDataFields } from '@store/popup/form/product/type';

import { IField } from '../type';

export interface TProductsData {
  data: IProduct[];
  serviceInformation: IServiceProductInformation[];
}

export interface IOneProduct {
  productInfo: IProduct;
  pointId: number;
  serviceInformation: Omit<IServiceProductInformation, 'productId'>;
}

export interface IProduct extends ITableObject {
  id: IField<number>;
  article: IField<string>;
  title: IField<string>;
  author: IField<string>;
  yearOfPublication: IField<string>;
  number: IField<number>;
  yearOfPrinting: IField<string>;
  printingHouse: IField<string>;
  publishingHouse: IField<string>;
  imageUrl: IField<string>;
  categoryTitle: IField<string>;
  categoryId: IField<number>;
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
  fields: IProductFormDataFields;
  pointId: number;
  userId: '1';
}

export interface IResponseApi {
  message: string;
}

export interface IMarkAsMovedRequestData {
  productId: number;
}
