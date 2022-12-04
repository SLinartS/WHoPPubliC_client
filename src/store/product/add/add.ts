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
        formData: this.root.storePopup.form.product.formData,
        pointId: this.root.storePopup.select.points.arrayValue[0],
        userId: '1',
      };
      yield extendAxios.post<IProductResponse>('products', requestProductData);

      this.root.storeProduct.status.set('add', 'done');
      this.root.storeTable.selectedItem.setItemId('products', 0);
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeProduct.status.set('add', 'error');
    }
  }
}
