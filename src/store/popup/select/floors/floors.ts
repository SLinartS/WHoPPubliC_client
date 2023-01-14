import { makeAutoObservable, toJS } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { TArrayOrErrorType } from '../../../type';
import { INITIAL_ARRAY_VALUE } from '../../form/config';

export class StorePopupSelectFloors {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private array: TArrayOrErrorType = deepCopy(INITIAL_ARRAY_VALUE);

  public get arrayValue() {
    return this.array.value;
  }

  public get arrayErrors() {
    return toJS(this.array.errors);
  }

  public set arrayErrors(newError: string[]) {
    this.array.errors = newError;
  }

  public setItems(Items: number[]) {
    this.array.value = Items;

    this.root.storePopup.select.utils.utils.checkErrorsExist('floors');
  }

  public checkIsAdded(itemId: number) {
    if (this.array.value.includes(itemId)) {
      return true;
    }
    return false;
  }

  public addItem(ItemId: number) {
    this.array.value.push(ItemId);

    this.root.storePopup.select.utils.utils.checkErrorsExist('floors');
  }

  public removeItem(itemId: number) {
    this.array.value = this.array.value.filter((id) => id !== itemId);

    this.root.storePopup.select.utils.utils.checkErrorsExist('floors');
  }

  public clearArray() {
    this.array = INITIAL_ARRAY_VALUE;
  }
}
