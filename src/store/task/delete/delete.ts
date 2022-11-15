import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { INewTaskData } from '../type';

export class StoreTaskDelete {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *task(actionIfDone?: () => void) {
    try {
      const taskTypeId = this.root.storeForm.task.utils.getTaskTypeId();
      const newTaskData: INewTaskData = {
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
        arrays: this.root.storeForm.task.array.formData,
      };

      yield extendAxios.post('tasks', newTaskData);
      this.root.storeTask.status.set('delete', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeTask.status.set('delete', 'error');
    }
  }
}
