import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TValueOrErrorType } from '../../type';

export class StoreFormError {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public isProductErrors(): boolean {
    const fields = this.root.storeForm.product.field.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }

  public isTaskErrors(isCheckWarehousePoint: boolean = true): boolean {
    if (
      this.isTaskArrayErrors(isCheckWarehousePoint) ||
      this.isTaskFieldErrors()
    ) {
      return true;
    }
    return false;
  }

  private isTaskFieldErrors(): boolean {
    const fields = this.root.storeForm.task.field.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }

  private isTaskArrayErrors(isCheckWarehousePoint: boolean) {
    const { list } = this.root.storeForm.product.list;
    const { points } = this.root.storeForm.task.array.formData;
    const { warehousePoints } = this.root.storeForm.task.array.formData;

    if (points.errors.length) {
      return true;
    }
    if (warehousePoints.errors.length && isCheckWarehousePoint) {
      return true;
    }
    if (!list.length) {
      return true;
    }

    return false;
  }
}
