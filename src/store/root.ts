import { configure } from 'mobx';

import { StoreCategory } from './category/category';
import { StoreFormProduct } from './form/product/product';
import { StoreFormTask } from './form/task/task';
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

  public storeProduct: StoreProducts;

  public storeMap: StoreMap;

  public storePoint: StorePoint;

  public storePopup: StorePopup;

  public storeFormTask: StoreFormTask;

  public storeFormProduct: StoreFormProduct;

  public storeCategory: StoreCategory;


  private constructor() {
    this.storeTasks = new StoreTasks(this);
    this.storeProduct = new StoreProducts(this);

    this.storeMap = new StoreMap(this);
    this.storePoint = new StorePoint(this);
   
    this.storePopup = new StorePopup(this);

    this.storeFormTask = new StoreFormTask(this);
    this.storeFormProduct = new StoreFormProduct(this);

    this.storeCategory = new StoreCategory(this);
  }

  public static getInstance(): RootStore {
    if (!RootStore.instance) {
      RootStore.instance = new RootStore();
    }
    return RootStore.instance;
  }
}

export default RootStore;
