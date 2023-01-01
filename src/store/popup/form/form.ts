import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TActionType, TTaskType } from '../../type';

export class StorePopupForm {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _formActionType: TActionType = 'create';

  public get formActionType() {
    return this._formActionType;
  }

  public set formActionType(newType: TActionType) {
    this._formActionType = newType;
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
