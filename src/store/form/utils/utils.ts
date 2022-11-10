import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TValueOrErrorType } from '../../type';

export class StoreFormUtils {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  public getTaskTypeId(): string {
    if (this.rootStore.storeFormState.currentTaskType === 'acceptance') {
      return '1';
    }
    return '2';
  }

  public resetTaskForm(): void {
    this.rootStore.storeFormTaskArray.clearArrays();
    this.rootStore.storeFormProductList.clearProductList();
    this.rootStore.storeFormTaskField.clearFormData();
    this.rootStore.storeProduct.statusAddProducts = 'pending';
    this.rootStore.storePoint.statusFetchPoints = 'pending';
    this.rootStore.storeProduct.statusFetchProducts = 'pending';
    this.rootStore.storeCategory.statusFetchCategories = 'pending';
    this.rootStore.storeTasks.statusAddTask = 'pending';
    this.rootStore.storeFormState.isDisplayDefaultErrors = false;
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

  public checkTaskErrors(isCheckWarehousePoint: boolean = true): boolean {
    if (
      this.checkTaskArrayErrors(isCheckWarehousePoint) ||
      this.checkTaskFieldErrors()
    ) {
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

  private checkTaskArrayErrors(isCheckWarehousePoint: boolean) {
    const { list } = this.rootStore.storeFormProductList;
    const { points } = this.rootStore.storeFormTaskArray.formData;
    const { warehousePoints } = this.rootStore.storeFormTaskArray.formData;

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
