import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IProductResponse, IRequestProduct } from '../type';

export class StoreProductUpdate {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *product(actionIfDone?: () => void) {
    try {
      const requestProductData: IRequestProduct = {
        fields: this.root.storePopup.form.product.formData,
        pointId: this.root.storePopup.select.points.values[0],
        userId: '1',
      };
      yield extendAxios.put<Omit<IProductResponse, 'productIds'>>(
        'products',
        requestProductData,
      );

      this.root.storeProduct.status.set('update', 'done');
      this.root.storeTable.selectedItem.setItemId('products', 'products', 0);
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeProduct.status.set('update', 'error');
    }
  }
}
