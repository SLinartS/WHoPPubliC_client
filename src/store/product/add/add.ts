import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IProductResponse } from '../type';
import { IRequestProductData } from './type';

export class StoreProductAdd {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *products(actionIfDone?: () => void) {
    try {
      const requestProductData: IRequestProductData = {
        products: this.root.storePopup.form.productList.list,
        userId: '1',
      };
      const response: AxiosResponse<IProductResponse> =
        yield extendAxios.post<IProductResponse>(
          'products',
          requestProductData,
        );

      this.root.storePopup.select.products.clearArray();
      for (const productId of response.data.productIds) {
        this.root.storePopup.select.products.addItem(productId);
      }
      this.root.storeProduct.status.set('add', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeProduct.status.set('add', 'error');
    }
  }
}
