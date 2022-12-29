import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TActionTaskType, TTaskType } from '../../type';

export class StorePopupForm {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _taskActionType: TActionTaskType = 'create';

  public get taskActionType() {
    return this._taskActionType;
  }

  public set taskActionType(newType: TActionTaskType) {
    this._taskActionType = newType;
  }

  private _isDisplayDefaultErrors: boolean = false;

  public get isDisplayDefaultErrors() {
    return this._isDisplayDefaultErrors;
  }

  public set isDisplayDefaultErrors(newStatus: boolean) {
    this._isDisplayDefaultErrors = newStatus;
  }

  private _currentTaskType: TTaskType = 'acceptance';

  public get currentTaskType() {
    return this._currentTaskType;
  }

  public set currentTaskType(newType: TTaskType) {
    this._currentTaskType = newType;
  }

  private _isSelectedMap: boolean = false;

  public get isSelectedMap() {
    return this._isSelectedMap;
  }

  public set isSelectedMap(newStatus: boolean) {
    this._isSelectedMap = newStatus;
  }

  private _isSelectedPoint: boolean = false;

  public get isSelectedPoint() {
    return this._isSelectedPoint;
  }

  public set isSelectedPoint(newStatus: boolean) {
    this._isSelectedPoint = newStatus;
  }
}
