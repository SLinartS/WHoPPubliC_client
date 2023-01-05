import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import { IProductFormDataFields } from '../../popup/form/product/type';
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

      const { productInfo } = response.data;
      const { storePopup } = this.root;

      Object.entries(productInfo).forEach(([key, element]) => {
        if (key !== 'categoryTitle') {
          const typedKey = key as keyof IProductFormDataFields;
          storePopup.form.product.setFormField(typedKey, String(element.value));
        }
      });

      storePopup.select.points.clearArray();
      storePopup.select.points.addItem(response.data.pointId);

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
      this.root.storeProduct.status.set('fetch', 'done');

      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeProduct.status.set('fetch', 'error');
    }
  }
}
