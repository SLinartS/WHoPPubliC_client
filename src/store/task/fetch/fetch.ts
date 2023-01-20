import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IOneTask, ITask } from '../type';

export class StoreTaskFetch {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *oneTask(taskId: number, actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IOneTask> = yield extendAxios.get<IOneTask>(
        `taskinfo/${taskId}`,
      );
      this.root.storeTask.state.task = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.set('fetchOne', 'done');
    } catch (error) {
      this.root.storeTask.status.set('fetchOne', 'error');
    }
  }

  public *acceptance(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<ITask[]> = yield extendAxios.get<ITask[]>(
        'tasks/acceptance',
      );
      this.root.storeTask.state.setTasks('acceptance', response.data);

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.setFetch('acceptance', 'done');
    } catch (error) {
      this.root.storeTask.status.setFetch('acceptance', 'error');
    }
  }

  public *shipment(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<ITask[]> = yield extendAxios.get<ITask[]>(
        'tasks/shipment',
      );
      this.root.storeTask.state.setTasks('shipment', response.data);

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.setFetch('shipment', 'done');
    } catch (error) {
      this.root.storeTask.status.setFetch('shipment', 'error');
    }
  }

  // !not implemented on the server
  public *intra(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<ITask[]> = yield extendAxios.get<ITask[]>(
        'tasks/intra',
      );
      this.root.storeTask.state.setTasks('intra', response.data);

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.setFetch('intra', 'done');
    } catch (error) {
      this.root.storeTask.status.setFetch('intra', 'error');
    }
  }
}
