import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IZone } from '../type';

export class StoreMapFetch {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *map() {
    try {
      const response: AxiosResponse<IZone[]> = yield extendAxios.get<IZone[]>(
        'map',
      );
      this.root.storeMap.state.map = response.data;
      this.root.storeMap.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeMap.status.set('fetch', 'error');
    }
  }
}
