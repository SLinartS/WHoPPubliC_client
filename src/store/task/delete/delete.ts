import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';

export class StoreTaskDelete {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *task(
    taskId: number,
    isDeleteProducts: boolean,
    actionIfDone?: () => void,
  ) {
    try {
      if (isDeleteProducts) {
        yield extendAxios.delete(`tasks/${taskId}?deleteProducts=1`);
      } else {
        yield extendAxios.delete(`tasks/${taskId}?deleteProducts=0`);
      }

      this.root.storeTask.status.set('delete', 'done');
      this.root.storeTable.selectedItem.setItemId('acceptanceTasks', 0);
      this.root.storeTable.selectedItem.setItemId('shipmentTasks', 0);
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeTask.status.set('delete', 'error');
    }
  }
}
