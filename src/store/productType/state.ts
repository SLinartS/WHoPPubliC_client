import { IOption } from '@store/category/type';
import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { TProductTypes } from './type';

export class StoreProductType {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _productTypes: IOption<TProductTypes>[] = [];

  public get productTypes() {
    return this._productTypes.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }

  public set productTypes(newProductTypes: IOption<TProductTypes>[]) {
    this._productTypes = newProductTypes;
  }
}
