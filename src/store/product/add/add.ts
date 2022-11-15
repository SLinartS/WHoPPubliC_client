import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IProductResponse } from '../type';

export class StoreProductAdd {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *products(actionIfDone?: () => void) {
    try {
      const { list } = this.root.storeForm.product.list;
      const newProductData = {
        products: list,
        warehousePoints:
          this.root.storeForm.task.array.getFormArrays('warehousePoints'),
        userId: '1',
      };
      const response: AxiosResponse<IProductResponse> =
        yield extendAxios.post<IProductResponse>('products', newProductData);
      for (const productId of response.data.productIds) {
        this.root.storeForm.task.array.addFormArrays('products', productId);
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
