import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TTaskType, TValueOrErrorType } from '../../type';
import { IWarehousePoint } from '../task/array/type';

export class StoreFormState {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  public checkTaskErrors() {
    const fields = this.rootStore.storeFormTaskField.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }

    const arrays = this.rootStore.storeFormTaskArray.formData;
    for (const value of Object.values(arrays)) {
      const typedValue: Array<any | IWarehousePoint> = value;
      if (!typedValue.length) {
        return true;
      }
    }
    return false;
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
