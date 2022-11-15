import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { ICategory } from '../type';

export class StoreCategoryFetch {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *categories() {
    try {
      const response: AxiosResponse<ICategory[]> = yield extendAxios.get<
        ICategory[]
      >('categories');

      this.root.storeCategory.state.categories = response.data;

      this.root.storeCategory.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeCategory.status.set('fetch', 'error');
    }
  }
}
