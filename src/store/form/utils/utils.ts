import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TValueOrErrorType } from '../../type';
import { IWarehousePoint } from '../task/array/type';

export class StoreFormUtils {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  public checkProductErrors(): boolean {
    const fields = this.rootStore.storeFormProductField.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }

  public checkTaskErrors(): boolean {
    if (this.checkTaskArrayErrors() || this.checkTaskFieldErrors()) {
      return true;
    }
    return false;
  }

  private checkTaskFieldErrors(): boolean {
    const fields = this.rootStore.storeFormTaskField.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }

  private checkTaskArrayErrors(): boolean {
    const { list } = this.rootStore.storeFormProductList;
    const { points } = this.rootStore.storeFormTaskArray.formData;
    const { warehousePoints } = this.rootStore.storeFormTaskArray.formData;

    if (points.errors.length) {
      return true;
    }
    if (warehousePoints.errors.length) {
      return true;
    }
    if (!list.length) {
      return true;
    }

    return false;
  }
}
