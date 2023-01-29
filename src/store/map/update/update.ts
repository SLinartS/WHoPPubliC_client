import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IRequestMap } from '../type';

export class StoreMapUpdate {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *mapUpdate(actionIfDone?: () => void) {
    try {
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
}
