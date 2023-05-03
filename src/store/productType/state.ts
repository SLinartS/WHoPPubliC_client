import { IOption } from '@store/category/type';
import { makeAutoObservable } from 'mobx';

import RootStore from '../root';

export class StoreProductType {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _productTypes: IOption[] = [];

  public get productTypes() {
    return this._productTypes.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }

  public set productTypes(newProductTypes: IOption[]) {
    this._productTypes = newProductTypes;
  }
}