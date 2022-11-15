import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IPoints } from '../type';

export class StorePointFetch {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *points() {
    try {
      const response: AxiosResponse<IPoints> = yield extendAxios.get<IPoints>(
        'points',
      );
      this.root.storePoint.state.points = response.data;
      this.root.storePoint.status.set('fetch', 'done');
    } catch (error) {
      this.root.storePoint.status.set('fetch', 'error');
    }
  }
}
