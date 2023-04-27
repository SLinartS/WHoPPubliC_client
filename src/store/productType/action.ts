import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IOptionType } from './type';

export class StoreProductTypeAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch() {
    try {
      const response: AxiosResponse<IOptionType[]> =
        yield extendAxios.get<AxiosResponse>('product-types');

      this.root.storeProductType.state.productTypes = response.data;

      this.root.storeProductType.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeProductType.status.set('fetch', 'error');
    }
  }
}
