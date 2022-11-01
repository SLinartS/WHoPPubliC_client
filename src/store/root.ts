import { configure } from 'mobx';

import { PopupStore } from './popup/popup';
import { TasksStore } from './tasks/tasks';
import { MapStore } from './map/map';
import { ProductsStore } from './products/products';
import { PointStore } from './point/point';
import { AddTaskFormStore } from './form/addTaskForm/addTaskForm';
import { AddProductFormStore } from './form/addProductForm/addProductForm';

configure({
  enforceActions: 'always',
});

class RootStore {
  private static instance: RootStore;

  public tasksStore: TasksStore;

  public mapStore: MapStore;

  public pointStore: PointStore;

  public productsStore: ProductsStore;

  public popupStore: PopupStore;

  public addTaskFormStore: AddTaskFormStore;

  public addProductFormStore: AddProductFormStore;

  private constructor() {
    this.tasksStore = new TasksStore(this);

    this.mapStore = new MapStore(this);
    this.pointStore = new PointStore(this);

    this.productsStore = new ProductsStore(this);
    this.popupStore = new PopupStore(this);

    this.addTaskFormStore = new AddTaskFormStore(this);
    this.addProductFormStore = new AddProductFormStore(this);
  }

  public static getInstance(): RootStore {
    if (!RootStore.instance) {
      RootStore.instance = new RootStore();
    }
    return RootStore.instance;
  }
}

export default RootStore;
