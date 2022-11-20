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
      const taskTypeId = this.root.storeForm.utils.getTaskTypeId();
      const requestTaskData: IRequestTaskData = {
        fields: {
          ...this.root.storeForm.task.field.formData,
          userId: {
            value: '1',
            errors: [],
          },
          typeId: {
            value: taskTypeId,
            errors: [],
          },
        },
        products: this.root.storeForm.task.array.getFormArrays('products'),
        warehousePoints:
          this.root.storeForm.task.array.getFormArrays('warehousePoints'),
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
