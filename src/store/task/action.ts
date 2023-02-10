import RootStore from '@store/root';
import { TTaskType } from '@store/type';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IOneTask, IRequestTaskData, ITask } from './type';

export class StoreTaskAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(taskType: TTaskType, actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<ITask[]> =
        yield extendAxios.get<AxiosResponse>(`tasks?type=${taskType}`);
      this.root.storeTask.state.setTasks(taskType, response.data);

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.setFetch(taskType, 'done');
    } catch (error) {
      this.root.storeTask.status.setFetch(taskType, 'error');
    }
  }

  public *show(taskId: number, actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IOneTask> =
        yield extendAxios.get<AxiosResponse>(`tasks/${taskId}`);
      this.root.storeTask.state.task = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.set('show', 'done');
    } catch (error) {
      this.root.storeTask.status.set('show', 'error');
    }
  }

  public *store(actionIfDone?: () => void) {
    const { storePopup } = this.root;

    const taskType = this.root.storeState.interface.currentTypeOfTask;
    const requestTaskData: IRequestTaskData = {
      fields: storePopup.form.task.formData,
      userId: 1,
      type: taskType,
      productIds: storePopup.select.products.values,
      floorIds: storePopup.select.floors.values,
      pointIds: storePopup.select.points.values,
    };

    try {
      yield extendAxios.post('tasks', requestTaskData);
      this.root.storeTask.status.set('store', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeTask.status.set('store', 'error');
    }
  }

  public *update(actionIfDone?: () => void) {
    const { storePopup } = this.root;
    const taskType = this.root.storeState.interface.currentTypeOfTask;
    const requestData: IRequestTaskData = {
      fields: storePopup.form.task.formData,
      userId: 1,
      type: taskType,
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

  public *destroy(
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

      this.root.storeTask.status.set('destroy', 'done');
      this.root.storeTable.selectedItem.setItemId('tasks', 'acceptance', 0);
      this.root.storeTable.selectedItem.setItemId('tasks', 'shipment', 0);
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeTask.status.set('destroy', 'error');
    }
  }
}
