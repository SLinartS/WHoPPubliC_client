import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IPoints } from './type';

export class StorePointAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch() {
    try {
      this.root.storePoint.status.set('fetch', 'during');
      const response: AxiosResponse<IPoints> =
        yield extendAxios.get<AxiosResponse>('points');
      this.root.storePoint.state.points = response.data;
      this.root.storePoint.status.set('fetch', 'done');
    } catch (error) {
      this.root.storePoint.status.set('fetch', 'error');
    }
  }
}
