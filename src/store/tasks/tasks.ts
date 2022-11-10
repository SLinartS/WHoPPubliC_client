import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { INewTaskData, ITasks } from './type';

export class StoreTasks {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  // STATUS FETCH ACCEPTANCE TASKS
  private _statusFetchAcceptanceTasks: TStatus = 'pending';

  public get statusFetchAcceptanceTasks() {
    return this._statusFetchAcceptanceTasks;
  }

  public set statusFetchAcceptanceTasks(newStatus: TStatus) {
    this._statusFetchAcceptanceTasks = newStatus;
  }

  // STATUS FETCH SHIPMENT TASKS
  private _statusFetchShipmentTasks: TStatus = 'pending';

  public get statusFetchShipmentTasks() {
    return this._statusFetchShipmentTasks;
  }

  public set statusFetchShipmentTasks(newStatus: TStatus) {
    this._statusFetchShipmentTasks = newStatus;
  }

  // STATUS ADD TASK
  private _statusAddTask: TStatus = 'pending';

  public get statusAddTask() {
    return this._statusAddTask;
  }

  public set statusAddTask(newStatus: TStatus) {
    this._statusAddTask = newStatus;
  }

  /*  Arrays of data
      from the server */
  public tasksAcceptanceList: ITasks = { data: [], tableHeader: [] };

  public tasksShipmentList: ITasks = { data: [], tableHeader: [] };

  public *fetchAcceptanceTasks() {
    try {
      const response: AxiosResponse<ITasks> = yield extendAxios.get<ITasks>(
        'tasks/acceptance',
      );
      this.tasksAcceptanceList = response.data;
      this._statusFetchAcceptanceTasks = 'done';
    } catch (error) {
      this._statusFetchAcceptanceTasks = 'error';
    }
  }

  public *fetchShipmentTasks() {
    try {
      const response: AxiosResponse<ITasks> = yield extendAxios.get<ITasks>(
        'tasks/shipment',
      );
      this.tasksShipmentList = response.data;
      this.statusFetchShipmentTasks = 'done';
    } catch (error) {
      this.statusFetchShipmentTasks = 'error';
    }
  }

  public *addTask(actionIfDone?: () => void) {
    try {
      const taskTypeId = this.rootStore.storeFormUtils.getTaskTypeId();
      const newTaskData: INewTaskData = {
        fields: {
          ...this.rootStore.storeFormTaskField.formData,
          userId: {
            value: '1',
            errors: [],
          },
          typeId: {
            value: taskTypeId,
            errors: [],
          },
        },
        arrays: this.rootStore.storeFormTaskArray.formData,
      };

      yield extendAxios.post('tasks', newTaskData);
      this.statusAddTask = 'done';
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      console.log(error, this.statusAddTask);
      this.statusAddTask = 'error';
    }
  }
}
