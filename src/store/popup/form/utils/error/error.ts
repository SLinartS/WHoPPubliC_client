import { makeAutoObservable } from 'mobx';

import RootStore from '../../../../root';
import { TValueOrErrorType } from '../../../../type';

export class StorePopupFormUtilsError {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public isProductErrors(): boolean {
    if (this.isProductArrayErrors() || this.isProductFieldErrors()) {
      return true;
    }
    return false;
  }

  public isProductFieldErrors(): boolean {
    const fields = this.root.storePopup.form.product.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }

  public isProductArrayErrors(): boolean {
    const { points } = this.root.storePopup.select;

    if (points.arrayErrors.length) {
      return true;
    }

    return false;
  }

  public isTaskErrors(isCheckFloor: boolean = true): boolean {
    if (this.isTaskArrayErrors(isCheckFloor) || this.isTaskFieldErrors()) {
      return true;
    }
    return false;
  }

  private isTaskFieldErrors(): boolean {
    const fields = this.root.storePopup.form.task.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }

  private isTaskArrayErrors(isCheckFloor: boolean) {
    const list = this.root.storePopup.select.products.arrayValue;
    const { floors } = this.root.storePopup.select;

    if (floors.arrayErrors.length && isCheckFloor) {
      return true;
    }
    if (!list.length) {
      return true;
    }

    return false;
  }
}
