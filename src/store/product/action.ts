import RootStore from '@store/root';
import { IResponseApi } from '@store/type';
import extendAxios from '@utils/extendAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import {
  IMarkAsMovedRequestData,
  IOneProduct,
  IProductResponse,
  IRequestProduct,
  TProductsData,
} from './type';

export class StoreProductAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(search: string, actionIfDone?: () => void) {
    try {
      this.root.storeProduct.status.set('fetch', 'during');
      const response: AxiosResponse<TProductsData> =
        yield extendAxios.get<TProductsData>(
          `products${search ? `?search=${search}` : ''}`,
        );
      this.root.storeProduct.state.products = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeProduct.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeProduct.status.set('fetch', 'error');
    }
  }

  public *show(productId: number, actionIfDone?: () => void) {
    try {
      this.root.storeProduct.status.set('show', 'during');
      const response: AxiosResponse<IOneProduct> =
        yield extendAxios.get<IOneProduct>(`products/${productId}`);

      this.root.storeProduct.state.product = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeProduct.status.set('show', 'done');
    } catch (error) {
      this.root.storeProduct.status.set('show', 'error');
    }
  }

  public *store(actionIfDone?: () => void) {
    try {
      this.root.storeProduct.status.set('store', 'during');
      const requestData: IRequestProduct = {
        fields: this.root.storePopup.form.product.formData,
        pointId: this.root.storePopup.select.points.values[0],
        userId: '1',
      };
      yield extendAxios.post<IProductResponse>('products', requestData);

      this.root.storeProduct.status.set('store', 'done');
      this.root.storeTable.selectedItem.setItemId('products', 'products', 0);
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeProduct.status.set('store', 'error');
    }
  }

  public *addFile(actionIfDone?: () => void) {
    try {
      this.root.storeProduct.status.set('addImage', 'during');
      const file = this.root.storePopup.form.product.getFile().value;
      if (!file) {
        throw new Error('file not found');
      }
      const productId = this.root.storePopup.form.product.formData.id.value;
      const formData = new FormData();
      formData.append('id', String(productId));
      formData.append('photo', file);
      yield extendAxios.post('products-add-image', formData, {
        headers: {
          'Content-Type': 'form/multipart',
        },
      });

      this.root.storeProduct.status.set('addImage', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeProduct.status.set('addImage', 'error');
    }
  }

  public *update(actionIfDone?: () => void) {
    try {
      this.root.storeProduct.status.set('update', 'during');
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

  public *destroy(productId: number, actionIfDone?: () => void) {
    try {
      this.root.storeProduct.status.set('destroy', 'during');
      yield extendAxios.delete(`products/${productId}`);

      this.root.storeProduct.status.set('destroy', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      const typeError = error as AxiosError<IResponseApi>;
      this.root.storeProduct.status.set('destroy', 'error');
      this.root.storePopup.status.show('windowInformation', () => {
        this.root.storePopup.windows.information.setting = {
          text: typeError.response?.data.message,
        };
      });
    }
  }

  public *markAsMoved(productId: number) {
    const requestData: IMarkAsMovedRequestData = {
      productId,
    };

    try {
      this.root.storeProduct.status.set('markAsMoved', 'during');
      yield extendAxios.patch('products/markAsMoved', requestData);

      this.root.storeProduct.status.set('markAsMoved', 'done');
    } catch (error) {
      this.root.storeProduct.status.set('markAsMoved', 'error');
    }
  }
}
