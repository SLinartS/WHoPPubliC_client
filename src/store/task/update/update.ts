import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IRequestTaskData } from '../add/type';

export class StoreTaskUpdate {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *task(actionIfDone?: () => void) {
    const { storePopup } = this.root;
    const taskTypeId = storePopup.form.utils.utils.getTaskTypeId();
    const requestData: IRequestTaskData = {
      fields: storePopup.form.task.formData,
      userId: 1,
      typeId: taskTypeId,
      productIds: storePopup.select.products.values,
      floorIds: storePopup.select.floors.values,
      pointIds: storePopup.select.points.values,
    };
    try {
      yield extendAxios.put('tasks', requestData);
      this.root.storeTask.status.set('update', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeTask.status.set('update', 'error');
    }
  }
}
