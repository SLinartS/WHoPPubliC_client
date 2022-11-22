import { makeAutoObservable, toJS } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { TArrayOrErrorType } from '../../../type';
import { INITIAL_ARRAY_VALUE } from '../../form/config';

export class StorePopupSelectPoints {
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

  public addItem(ItemId: number) {
    this.array.value.push(ItemId);

    this.root.storePopup.select.utils.utils.checkErrorsExist('points');
  }

  public removeItem(itemId: number) {
    this.array.value = this.array.value.filter((id) => id !== itemId);

    this.root.storePopup.select.utils.utils.checkErrorsExist('points');
  }

  public clearArray() {
    this.array = INITIAL_ARRAY_VALUE;
  }
}
