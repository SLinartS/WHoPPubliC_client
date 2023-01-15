import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IOneProduct, TProductsData } from '../type';

export class StoreProductFetch {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *oneProduct(productId: number, actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IOneProduct> =
        yield extendAxios.get<IOneProduct>(`productinfo/${productId}`);

      this.root.storeProduct.state.product = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeProduct.status.set('fetchOne', 'done');
    } catch (error) {
      this.root.storeProduct.status.set('fetchOne', 'error');
    }
  }

  public *products(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<TProductsData> =
        yield extendAxios.get<TProductsData>('products');
      this.root.storeProduct.state.products = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeProduct.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeProduct.status.set('fetch', 'error');
    }
  }
}
