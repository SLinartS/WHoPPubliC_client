import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IOptionCategory } from './type';

export class StoreCategoryAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch() {
    try {
      const response: AxiosResponse<IOptionCategory[]> =
        yield extendAxios.get<AxiosResponse>('categories');

      this.root.storeCategory.state.categories = response.data;

      this.root.storeCategory.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeCategory.status.set('fetch', 'error');
    }
  }
}
