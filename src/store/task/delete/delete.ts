import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';

export class StoreTaskDelete {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *task(taskId: number, actionIfDone?: () => void) {
    try {
      yield extendAxios.delete(`tasks/${taskId}`);
      this.root.storeTask.status.set('delete', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeTask.status.set('delete', 'error');
    }
  }
}
