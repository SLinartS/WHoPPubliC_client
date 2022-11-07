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
    if (this.checkTaskArrayErrors() && this.checkTaskFieldErrors()) {
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
    const arrays = this.rootStore.storeFormTaskArray.formData;
    for (const value of Object.values(arrays)) {
      const typedValue: Array<number | IWarehousePoint> = value;
      if (!typedValue.length) {
        return true;
      }
    }
    return false;
  }
}
