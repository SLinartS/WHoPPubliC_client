import { makeAutoObservable } from 'mobx';

import deepCopy from '../../utils/deepCopy/deepCopy';
import { INITIAL_VALUE_NUMBER, INITIAL_VALUE_STRING } from '../constants';
import RootStore from '../root';
import { TTaskType } from '../type';
import { IOneTask, ITask, ITasks } from './type';

const initialOneTask: IOneTask = {
  taskInfo: {
    id: INITIAL_VALUE_NUMBER,
    article: INITIAL_VALUE_STRING,
    deadlines: INITIAL_VALUE_STRING,
    timeStart: INITIAL_VALUE_STRING,
    timeEnd: INITIAL_VALUE_STRING,
    operatorLogin: INITIAL_VALUE_STRING,
  },
  productIds: [],
  floorInfo: [],
  pointIds: [],
};

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

  private _task: IOneTask = deepCopy(initialOneTask);

  public get task() {
    return this._task;
  }

  public set task(newTask: IOneTask) {
    this._task = newTask;
  }

  public clearTask() {
    this._task = deepCopy(initialOneTask);
  }
}
