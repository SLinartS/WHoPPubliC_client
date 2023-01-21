import { makeAutoObservable, toJS } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { TArrayOrErrorType } from '../../../type';
import { INITIAL_ARRAY_VALUE } from '../../form/config';

export class StorePopupSelectFloors {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _floors: TArrayOrErrorType = deepCopy(INITIAL_ARRAY_VALUE);

  public get values() {
    return this._floors.value;
  }

  public get errors() {
    return toJS(this._floors.errors);
  }

  public set errors(newError: string[]) {
    this._floors.errors = newError;
  }

  public setItems(Items: number[]) {
    this._floors.value = Items;

    this.root.storePopup.select.utils.utils.checkErrorsExist('floors');
  }

  public checkIsAdded(itemId: number) {
    if (this._floors.value.includes(itemId)) {
      return true;
    }
    return false;
  }

  public addItem(ItemId: number) {
    this._floors.value.push(ItemId);

    this.root.storePopup.select.utils.utils.checkErrorsExist('floors');
  }

  public removeItem(itemId: number) {
    this._floors.value = this._floors.value.filter((id) => id !== itemId);

    this.root.storePopup.select.utils.utils.checkErrorsExist('floors');
  }

  public clear() {
    this._floors = INITIAL_ARRAY_VALUE;
  }
}
