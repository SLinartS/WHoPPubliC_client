import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IResponseProductDelete } from './type';

export class StoreProductDelete {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *product(productId: number, actionIfDone?: () => void) {
    try {
      yield extendAxios.delete(`products/${productId}`);

      this.root.storeProduct.status.set('delete', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      const typeError = error as AxiosError<IResponseProductDelete>;
      this.root.storeProduct.status.set('delete', 'error');
      this.root.storePopup.status.show('windowInformation', () => {
        this.root.storePopup.windows.information.setting = {
          text: typeError.response?.data.message,
        };
      });
    }
  }
}
