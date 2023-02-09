import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IOption } from './type';

export class StoreCategory {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _categories: IOption[] = [];

  public get categories() {
    return this._categories.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }

  public set categories(newCategories: IOption[]) {
    this._categories = newCategories;
  }
}
