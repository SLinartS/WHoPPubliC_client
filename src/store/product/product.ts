import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import {
  INITIAL_VALUE_PRODUCT_NUMBER,
  INITIAL_VALUE_PRODUCT_STRING,
} from './config';
import { IOneProduct, TProductsData } from './type';

export class StoreProduct {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _products: TProductsData = {
    data: [],
    serviceInformation: [],
  };

  public get products() {
    return this._products;
  }

  public set products(newProducts: TProductsData) {
    this._products = newProducts;
  }

  private _product: IOneProduct = {
    productInfo: {
      id: INITIAL_VALUE_PRODUCT_NUMBER,
      article: INITIAL_VALUE_PRODUCT_STRING,
      title: INITIAL_VALUE_PRODUCT_STRING,
      author: INITIAL_VALUE_PRODUCT_STRING,
      yearOfPublication: INITIAL_VALUE_PRODUCT_STRING,
      number: INITIAL_VALUE_PRODUCT_NUMBER,
      printDate: INITIAL_VALUE_PRODUCT_STRING,
      printingHouse: INITIAL_VALUE_PRODUCT_STRING,
      publishingHouse: INITIAL_VALUE_PRODUCT_STRING,
      categoryTitle: INITIAL_VALUE_PRODUCT_STRING,
      categoryId: INITIAL_VALUE_PRODUCT_NUMBER,
    },
    pointId: 0,
    serviceInformation: {
      isLinkedToTask: false,
      taskId: 0,
      isLinkedFloors: false,
      floorIds: [],
    },
  };

  public get product() {
    return this._product;
  }

  public set product(newProducts: IOneProduct) {
    this._product = newProducts;
  }
}
