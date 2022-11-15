import { makeAutoObservable } from 'mobx';

import RootStore from '../../../root';
import { TValueOrErrorType } from '../../../type';

export class StoreFormTaskUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public isEnoughFreeSpace() {
    if (
      this.getOccupiedSpace() <
      this.root.storeForm.task.freeSpace.freeFloorSpace
    ) {
      return true;
    }
    return false;
  }

  public getOccupiedSpace(): number {
    let occepiedSpace = 0;
    for (const product of this.root.storeForm.product.list.list) {
      occepiedSpace += Number(product.number.value);
    }
    return occepiedSpace;
  }

  public getTaskTypeId(): string {
    if (this.root.storeForm.state.currentTaskType === 'acceptance') {
      return '1';
    }
    return '2';
  }

  public resetTaskForm(): void {
    this.root.storeForm.task.array.clearArrays();
    this.root.storeForm.product.list.clearProductList();
    this.root.storeForm.task.field.clearFormData();
    this.root.storeProduct.status.set('add', 'pending');
    this.root.storeProduct.status.set('fetch', 'pending');
    this.root.storePoint.status.set('fetch', 'pending');
    this.root.storeCategory.status.set('fetch', 'pending');
    this.root.storeTask.status.set('add', 'pending');
    this.root.storeForm.state.isDisplayDefaultErrors = false;
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
    const fields = this.root.storeForm.task.field.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }

  private checkTaskArrayErrors(isCheckWarehousePoint: boolean) {
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
