import { makeAutoObservable } from 'mobx';

import deepCopy from '../../utils/deepCopy/deepCopy';
import { INITIAL_VALUE_NUMBER, INITIAL_VALUE_STRING } from '../constants';
import RootStore from '../root';
import { IOneProduct, TProductsData } from './type';

const initialOneProduct: IOneProduct = {
  productInfo: {
    id: INITIAL_VALUE_NUMBER,
    article: INITIAL_VALUE_STRING,
    title: INITIAL_VALUE_STRING,
    author: INITIAL_VALUE_STRING,
    yearOfPublication: INITIAL_VALUE_STRING,
    number: INITIAL_VALUE_NUMBER,
    yearOfPrinting: INITIAL_VALUE_STRING,
    printingHouse: INITIAL_VALUE_STRING,
    publishingHouse: INITIAL_VALUE_STRING,
    imageUrl: INITIAL_VALUE_STRING,
    categoryTitle: INITIAL_VALUE_STRING,
    categoryId: INITIAL_VALUE_NUMBER,
  },
  pointId: 0,
  serviceInformation: {
    taskId: 0,
    floorIds: [],
    actualFloorIds: [],
    pointIds: [],
  },
};

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

  private _product: IOneProduct = deepCopy(initialOneProduct);

  public get product() {
    return this._product;
  }

  public set product(newProduct: IOneProduct) {
    this._product = newProduct;
  }

  public clearProduct() {
    this._product = deepCopy(initialOneProduct);
  }
}
