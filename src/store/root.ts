import { configure } from 'mobx';

import { StoreProductForm } from './form/product/product';
import { StoreTaskForm } from './form/task/task';
import { StoreMap } from './map/map';
import { StorePoint } from './point/point';
import { StorePopup } from './popup/popup';
import { StoreProducts } from './products/products';
import { StoreTasks } from './tasks/tasks';

configure({
  enforceActions: 'always',
});

class RootStore {
  private static instance: RootStore;

  public storeTasks: StoreTasks;

  public storeMap: StoreMap;

  public storePoint: StorePoint;

  public storeProduct: StoreProducts;

  public storePopup: StorePopup;

  public storeTaskForm: StoreTaskForm;

  public storeProductForm: StoreProductForm;

  private constructor() {
    this.storeTasks = new StoreTasks(this);

    this.storeMap = new StoreMap(this);
    this.storePoint = new StorePoint(this);

    this.storeProduct = new StoreProducts(this);
    this.storePopup = new StorePopup(this);

    this.storeTaskForm = new StoreTaskForm(this);
    this.storeProductForm = new StoreProductForm(this);
  }

  public static getInstance(): RootStore {
    if (!RootStore.instance) {
      RootStore.instance = new RootStore();
    }
    return RootStore.instance;
  }
}

export default RootStore;
