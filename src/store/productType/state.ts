import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IOptionType } from './type';

export class StoreProductType {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _productTypes: IOptionType[] = [];

  public get productTypes() {
    return this._productTypes.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }

  public set productTypes(newCategories: IOptionType[]) {
    this._productTypes = newCategories;
  }
}
