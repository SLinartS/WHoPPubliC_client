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

  /*  Status of receiving 
      data from the server  */
  private _statusFetchCategories: TStatus = 'pending';

  public get statusFetchCategories() {
    return this._statusFetchCategories;
  }

  public set statusFetchCategories(newStatus: TStatus) {
    this._statusFetchCategories = newStatus;
  }

  /*  Array of data 
      from the server */
  private _categories: Array<ICategory> = [];

  public get categories() {
    return this._categories;
  }

  private set categories(newCategories: Array<ICategory>) {
    this._categories = newCategories;
  }

  public *fetchCategories() {
    try {
      const response: AxiosResponse<Array<ICategory>> = yield extendAxios.get<
        Array<ICategory>
      >('categories');

      this.categories = response.data;

      this.statusFetchCategories = 'done';
    } catch (error) {
      this.statusFetchCategories = 'error';
    }
  }
}
