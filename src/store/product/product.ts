import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { TProductsData } from './type';

export class StoreProduct {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _products: TProductsData = {
    data: [],
    tableHeader: [],
  };

  public get products() {
    return this._products;
  }

  public set products(newProducts: TProductsData) {
    this._products = newProducts;
  }

  private _productsOfTask: TProductsData = {
    data: [],
    tableHeader: [],
  };

  public get productsOfTask() {
    return this._productsOfTask;
  }

  public set productsOfTask(newProducts: TProductsData) {
    this._productsOfTask = newProducts;
  }
}
