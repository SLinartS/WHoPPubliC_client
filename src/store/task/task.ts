import { makeAutoObservable } from 'mobx';

import { INITIAL_VALUE_NUMBER, INITIAL_VALUE_STRING } from '../constants';
import RootStore from '../root';
import { TTaskType } from '../type';
import { IOneTask, ITask, ITasks } from './type';

export class StoreTask {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private tasks: ITasks = {
    acceptance: [],
    shipment: [],
    intra: [],
  };

  public getTasks(type: TTaskType) {
    return this.tasks[type];
  }

  public setTasks(type: TTaskType, newTasks: ITask[]) {
    this.tasks[type] = newTasks;
  }

  private _task: IOneTask = {
    taskInfo: {
      id: INITIAL_VALUE_NUMBER,
      article: INITIAL_VALUE_STRING,
      deadlines: INITIAL_VALUE_STRING,
      dateStart: INITIAL_VALUE_STRING,
      dateEnd: INITIAL_VALUE_STRING,
      operatorLogin: INITIAL_VALUE_STRING,
    },
    productIds: [],
    floorIds: [],
  };

  public get task() {
    return this._task;
  }

  public set task(newTask: IOneTask) {
    this._task = newTask;
  }
}
