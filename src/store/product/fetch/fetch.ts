import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { TProductsData } from '../type';

export class StoreProductFetch {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *products() {
    try {
      const response: AxiosResponse<TProductsData> =
        yield extendAxios.get<TProductsData>('products');
      this.root.storeProduct.state.products = response.data;
      this.root.storeProduct.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeProduct.status.set('fetch', 'error');
    }
  }
}
