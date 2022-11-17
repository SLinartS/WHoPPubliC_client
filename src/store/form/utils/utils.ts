import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';

export class StoreFormUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public getTaskTypeId(): string {
    if (this.root.storeForm.state.currentTaskType === 'acceptance') {
      return '1';
    }
    return '2';
  }

  public resetForm(): void {
    this.root.storeForm.task.array.clearArrays();
    this.root.storeForm.product.list.clearProductList();
    this.root.storeForm.task.field.clearFormData();
    this.root.storeForm.floorSpace.clearFreeSpace();
    this.root.storeProduct.status.set('add', 'pending');
    this.root.storeProduct.status.set('fetch', 'pending');
    this.root.storePoint.status.set('fetch', 'pending');
    this.root.storeCategory.status.set('fetch', 'pending');
    this.root.storeTask.status.set('add', 'pending');
    this.root.storeForm.state.isDisplayDefaultErrors = false;
  }
}
