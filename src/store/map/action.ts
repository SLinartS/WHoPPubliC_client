import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IRequestMap, IZone } from './type';

export class StoreMapAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch() {
    try {
      this.root.storeMap.status.set('fetch', 'during');
      const response: AxiosResponse<IZone[]> =
        yield extendAxios.get<AxiosResponse>('map');
      this.root.storeMap.state.map = response.data;
      this.root.storeMap.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeMap.status.set('fetch', 'error');
    }
  }

  public *update(actionIfDone?: () => void) {
    try {
      this.root.storeMap.status.set('update', 'during');
      const requestZoneData: IRequestMap = {
        zone: this.root.storePopup.form.map.currentZone,
      };
      yield extendAxios.put('map', requestZoneData);

      this.root.storeMap.status.set('update', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeMap.status.set('update', 'error');
    }
  }

  public *destroy(zoneId: number, actionIfDone?: () => void) {
    try {
      this.root.storeMap.status.set('destroy', 'during');
      yield extendAxios.delete(`map/${zoneId}`);

      this.root.storeMap.status.set('destroy', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeMap.status.set('destroy', 'error');
    }
  }
}
