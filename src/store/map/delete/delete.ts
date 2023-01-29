import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';

export class StoreMapDelete {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *delete(zoneId: number, actionIfDone?: () => void) {
    try {
      yield extendAxios.delete(`map/${zoneId}`);

      this.root.storeMap.status.set('delete', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeMap.status.set('delete', 'error');
    }
  }
}
