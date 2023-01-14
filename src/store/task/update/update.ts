import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IRequestTaskData } from '../add/type';

export class StoreTaskUpdate {
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
        floorIds: this.root.storePopup.select.floors.arrayValue,
      };

      yield extendAxios.put('tasks', requestTaskData);
      this.root.storeTask.status.set('update', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeTask.status.set('update', 'error');
    }
  }
}
