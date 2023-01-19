import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IMarkAsMovedRequestData } from './type';

export class StoreProductMarkAsMoved {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *markAsMoved(requestData: IMarkAsMovedRequestData) {
    try {
      yield extendAxios.patch('product/markAsMoved', requestData);

      this.root.storeProduct.status.set('markAsMoved', 'done');
    } catch (error) {
      this.root.storeProduct.status.set('markAsMoved', 'error');
    }
  }
}
