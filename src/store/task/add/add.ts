import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IRequestTaskData } from './type';

export class StoreTaskAdd {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *task(actionIfDone?: () => void) {
    try {
      const taskTypeId = this.root.storePopup.form.utils.utils.getTaskTypeId();
      const requestTaskData: IRequestTaskData = {
        fields: {
          ...this.root.storePopup.form.task.formData,
          userId: {
            value: '1',
            errors: [],
          },
          typeId: {
            value: taskTypeId,
            errors: [],
          },
        },
        productIds: this.root.storePopup.select.products.arrayValue,
        warehousePointIds:
          this.root.storePopup.select.warehousePoints.arrayValue,
      };

      yield extendAxios.post('tasks', requestTaskData);
      this.root.storeTask.status.set('add', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeTask.status.set('add', 'error');
    }
  }
}
