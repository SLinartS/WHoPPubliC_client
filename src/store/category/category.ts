import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { ICategory } from './type';

export class StoreCategory {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  private _statusFetchCategories: TStatus = 'pending';

  public get statusFetchCategories() {
    return this._statusFetchCategories;
  }

  public set statusFetchCategories(newStatus: TStatus) {
    this._statusFetchCategories = newStatus;
  }

  private _categories: ICategory[] = [];

  public get categories() {
    return this._categories;
  }

  private set categories(newCategories: ICategory[]) {
    this._categories = newCategories;
  }

  public *fetchCategories() {
    try {
      const response: AxiosResponse<ICategory[]> = yield extendAxios.get<
        ICategory[]
      >('categories');

      this.categories = response.data;

      this.statusFetchCategories = 'done';
    } catch (error) {
      this.statusFetchCategories = 'error';
    }
  }
}
