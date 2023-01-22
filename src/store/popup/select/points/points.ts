import { makeAutoObservable, toJS } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { TArrayOrErrorType } from '../../../type';
import { INITIAL_ARRAY_VALUE } from '../../form/config';

export class StorePopupSelectPoints {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _points: TArrayOrErrorType = deepCopy(INITIAL_ARRAY_VALUE);

  public get values() {
    return this._points.value;
  }

  public get errors() {
    return toJS(this._points.errors);
  }

  public set errors(newError: string[]) {
    this._points.errors = newError;
  }

  public set values(newValues: number[]) {
    this._points.value = newValues;
    this.root.storePopup.select.utils.utils.checkErrorsExist('points');
  }

  public addItem(ItemId: number) {
    this._points.value.push(ItemId);

    this.root.storePopup.select.utils.utils.checkErrorsExist('points');
  }

  public checkIsAdded(itemId: number) {
    if (this._points.value.includes(itemId)) {
      return true;
    }
    return false;
  }

  public removeItem(itemId: number) {
    this._points.value = this._points.value.filter((id) => id !== itemId);

    this.root.storePopup.select.utils.utils.checkErrorsExist('points');
  }

  public clear() {
    this._points = INITIAL_ARRAY_VALUE;
  }
}
