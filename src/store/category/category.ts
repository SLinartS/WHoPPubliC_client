import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { ICategory } from './type';

export class StoreCategory {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _categories: ICategory[] = [];

  public get categories() {
    return this._categories;
  }

  public set categories(newCategories: ICategory[]) {
    this._categories = newCategories;
  }
}
