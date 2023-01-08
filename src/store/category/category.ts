import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IOptions } from './type';

export class StoreCategory {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _categories: IOptions[] = [];

  public get categories() {
    return this._categories;
  }

  public set categories(newCategories: IOptions[]) {
    this._categories = newCategories;
  }
}
