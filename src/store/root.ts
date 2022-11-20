import { configure } from 'mobx';

import { StoreCategory } from './category/category';
import { StoreCategoryFetch } from './category/fetch/fetch';
import { StoreCategoryStatus } from './category/status/status';
import { StoreFormError } from './form/error/error';
import { StoreFormFloorSpace } from './form/floorSpace/floorSpace';
import { StoreForm } from './form/form';
import { StoreFormProductArray } from './form/product/array/array';
import { StoreFormProductField } from './form/product/field/field';
import { StoreFormProductList } from './form/product/list/list';
import { StoreFormTaskArray } from './form/task/array/array';
import { StoreFormTaskField } from './form/task/field/field';
import { StoreFormUtils } from './form/utils/utils';
import { StoreMapFetch } from './map/fetch/fetch';
import { StoreMap } from './map/map';
import { StoreMapStatus } from './map/status/status';
import { StoreMapUtils } from './map/utils/utils';
import { StorePointFetch } from './point/fetch/fetch';
import { StorePoint } from './point/point';
import { StorePointStatus } from './point/status/status';
import { StorePointUtils } from './point/utils/utils';
import { StorePopup } from './popup/popup';
import { StoreProductAdd } from './product/add/add';
import { StoreProductFetch } from './product/fetch/fetch';
import { StoreProduct } from './product/product';
import { StoreProductStatus } from './product/status/status';
import { StoreTaskAdd } from './task/add/add';
import { StoreTaskDelete } from './task/delete/delete';
import { StoreTaskFetch } from './task/fetch/fetch';
import { StoreTaskStatus } from './task/status/status';
import { StoreTask } from './task/task';
import { StoreWindowConfirm } from './window/confirm/confirm';

configure({
  enforceActions: 'always',
});

interface IStoreTask {
  state: StoreTask;
  status: StoreTaskStatus;
  fetch: StoreTaskFetch;
  add: StoreTaskAdd;
  delete: StoreTaskDelete;
}

interface IStoreProduct {
  state: StoreProduct;
  status: StoreProductStatus;
  fetch: StoreProductFetch;
  add: StoreProductAdd;
}

interface IStoreMap {
  state: StoreMap;
  status: StoreMapStatus;
  fetch: StoreMapFetch;
  utils: StoreMapUtils;
}

interface IStorePoint {
  state: StorePoint;
  status: StorePointStatus;
  fetch: StorePointFetch;
  utils: StorePointUtils;
}

interface IStoreCategory {
  state: StoreCategory;
  status: StoreCategoryStatus;
  fetch: StoreCategoryFetch;
}

interface IStoreForm {
  state: StoreForm;
  floorSpace: StoreFormFloorSpace;
  utils: StoreFormUtils;
  error: StoreFormError;
  task: {
    field: StoreFormTaskField;
    array: StoreFormTaskArray;
  };
  product: {
    list: StoreFormProductList;
    array: StoreFormProductArray;
    field: StoreFormProductField;
  };
}

interface IStoreWindow {
  confirm: StoreWindowConfirm;
}

class RootStore {
  private static instance: RootStore;

  public storeTask: IStoreTask;

  public storeProduct: IStoreProduct;

  public storeMap: IStoreMap;

  public storePoint: IStorePoint;

  public storeCategory: IStoreCategory;

  public storePopup: StorePopup;

  public storeForm: IStoreForm;

  public storeWindow: IStoreWindow;

  private constructor() {
    this.storeTask = {
      state: new StoreTask(this),
      status: new StoreTaskStatus(this),
      fetch: new StoreTaskFetch(this),
      add: new StoreTaskAdd(this),
      delete: new StoreTaskDelete(this),
    };

    this.storeProduct = {
      state: new StoreProduct(this),
      status: new StoreProductStatus(this),
      fetch: new StoreProductFetch(this),
      add: new StoreProductAdd(this),
    };

    this.storeMap = {
      state: new StoreMap(this),
      status: new StoreMapStatus(this),
      fetch: new StoreMapFetch(this),
      utils: new StoreMapUtils(this),
    };

    this.storePoint = {
      state: new StorePoint(this),
      status: new StorePointStatus(this),
      fetch: new StorePointFetch(this),
      utils: new StorePointUtils(this),
    };

    this.storeCategory = {
      state: new StoreCategory(this),
      status: new StoreCategoryStatus(this),
      fetch: new StoreCategoryFetch(this),
    };

    this.storePopup = new StorePopup(this);

    this.storeForm = {
      state: new StoreForm(this),
      floorSpace: new StoreFormFloorSpace(this),
      utils: new StoreFormUtils(this),
      error: new StoreFormError(this),
      task: {
        array: new StoreFormTaskArray(this),
        field: new StoreFormTaskField(this),
      },
      product: {
        list: new StoreFormProductList(this),
        array: new StoreFormProductArray(this),
        field: new StoreFormProductField(this),
      },
    };

    this.storeWindow = {
      confirm: new StoreWindowConfirm(this),
    };
  }

  public static getInstance(): RootStore {
    if (!RootStore.instance) {
      RootStore.instance = new RootStore();
    }
    return RootStore.instance;
  }
}

export default RootStore;
