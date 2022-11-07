import { configure } from 'mobx';

import { StoreCategory } from './category/category';
import { StoreFormProductField } from './form/product/field/field';
import { StoreFormProductList } from './form/product/list/list';
import { StoreFormState } from './form/state/state';
import { StoreFormTaskArray } from './form/task/array/array';
import { StoreFormTaskField } from './form/task/field/field';
import { StoreFormUtils } from './form/utils/utils';
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

  public storeFormState: StoreFormState;

  public storeFormTaskField: StoreFormTaskField;

  public storeFormTaskArray: StoreFormTaskArray;

  public storeFormProductField: StoreFormProductField;

  public storeFormProductList: StoreFormProductList;

  public storeCategory: StoreCategory;

  public storeFormUtils: StoreFormUtils;

  private constructor() {
    this.storeTasks = new StoreTasks(this);
    this.storeProduct = new StoreProducts(this);

    this.storeMap = new StoreMap(this);
    this.storePoint = new StorePoint(this);

    this.storePopup = new StorePopup(this);

    this.storeFormState = new StoreFormState(this);
    this.storeFormTaskField = new StoreFormTaskField(this);
    this.storeFormTaskArray = new StoreFormTaskArray(this);

    this.storeFormProductField = new StoreFormProductField(this);
    this.storeFormProductList = new StoreFormProductList(this);

    this.storeCategory = new StoreCategory(this);
    this.storeFormUtils = new StoreFormUtils(this);
  }

  public static getInstance(): RootStore {
    if (!RootStore.instance) {
      RootStore.instance = new RootStore();
    }
    return RootStore.instance;
  }
}

export default RootStore;
