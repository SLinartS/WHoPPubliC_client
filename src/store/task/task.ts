import { makeAutoObservable } from 'mobx';

import { INITIAL_VALUE_NUMBER, INITIAL_VALUE_STRING } from '../constants';
import RootStore from '../root';
import { IOneTask, ITasks } from './type';

export class StoreTask {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _acceptanceList: ITasks = { data: [] };

  public get acceptanceList() {
    return this._acceptanceList;
  }

  public set acceptanceList(newList: ITasks) {
    this._acceptanceList = newList;
  }

  private _shipmentList: ITasks = { data: [] };

  public get shipmentList() {
    return this._shipmentList;
  }

  public set shipmentList(newList: ITasks) {
    this._shipmentList = newList;
  }

  private _intraList: ITasks = { data: [] };

  public get intraList() {
    return this._intraList;
  }

  public set intraList(newList: ITasks) {
    this._intraList = newList;
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
