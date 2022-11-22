import { makeAutoObservable } from 'mobx';

import RootStore from '../../../root';

export class StorePopupFormUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public getTaskTypeId(): string {
    if (this.root.storePopup.form.state.currentTaskType === 'acceptance') {
      return '1';
    }
    return '2';
  }

  public resetForm(): void {
    this.root.storePopup.select.points.clearArray();
    this.root.storePopup.select.warehousePoints.clearArray();
    this.root.storePopup.select.warehousePoints.clearArray();
    this.root.storePopup.form.productList.clearProductList();
    this.root.storePopup.form.task.clearFormData();
    this.root.storePopup.select.utils.floorSpace.clearFreeSpace();
    this.root.storeProduct.status.set('add', 'pending');
    this.root.storeProduct.status.set('fetch', 'pending');
    this.root.storePoint.status.set('fetch', 'pending');
    this.root.storeCategory.status.set('fetch', 'pending');
    this.root.storeTask.status.set('add', 'pending');
    this.root.storePopup.form.state.isDisplayDefaultErrors = false;
  }
}
