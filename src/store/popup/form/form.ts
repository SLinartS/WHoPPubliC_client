import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TActionType } from '../../type';

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

  private _isSelectedMap: boolean = false;

  public get isSelectedMap() {
    return this._isSelectedMap;
  }

  public set isSelectedMap(newStatus: boolean) {
    this._isSelectedMap = newStatus;
  }

  private _isViewMap: boolean = false;

  public get isViewMap() {
    return this._isViewMap;
  }

  public set isViewMap(newStatus: boolean) {
    this._isViewMap = newStatus;
  }

  private _isSelectedPoint: boolean = false;

  public get isSelectedPoint() {
    return this._isSelectedPoint;
  }

  public set isSelectedPoint(newStatus: boolean) {
    this._isSelectedPoint = newStatus;
  }

  private _isInProductForm: boolean = false;

  public get isInProductForm() {
    return this._isInProductForm;
  }

  public set isInProductForm(newStatus: boolean) {
    this._isInProductForm = newStatus;
  }
}
