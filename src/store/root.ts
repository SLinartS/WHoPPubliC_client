import { configure } from 'mobx';

import { StoreCategory } from './category/category';
import { StoreCategoryFetch } from './category/fetch/fetch';
import { StoreCategoryStatus } from './category/status/status';
import { StoreMapFetch } from './map/fetch/fetch';
import { StoreMap } from './map/map';
import { StoreMapStatus } from './map/status/status';
import { StoreMapUtils } from './map/utils/utils';
import { StorePointFetch } from './point/fetch/fetch';
import { StorePoint } from './point/point';
import { StorePointStatus } from './point/status/status';
import { StorePointUtils } from './point/utils/utils';
import { StorePopupForm } from './popup/form/form';
import { StorePopupFormProduct } from './popup/form/product/product';
import { StorePopupFormTask } from './popup/form/task/task';
import { StorePopupFormUtilsError } from './popup/form/utils/error/error';
import { StorePopupFormUtils } from './popup/form/utils/utils';
import { StorePopupSelectPoints } from './popup/select/points/points';
import { StorePopupSelectProducts } from './popup/select/products/products';
import { StorePopupSelectUtilsFloorSpace } from './popup/select/utils/floorSpace/floorSpace';
import { StorePopupSelectUtils } from './popup/select/utils/utils';
import { StorePopupSelectWarehousePoints } from './popup/select/warehousePoints/warehousePoints';
import { StorePopupStatus } from './popup/status/status';
import { StorePopupWindowConfirm } from './popup/window/confirm/confirm';
import { StorePopupWindowInformation } from './popup/window/information/information';
import { StoreProductAdd } from './product/add/add';
import { StoreProductDelete } from './product/delete/delete';
import { StoreProductFetch } from './product/fetch/fetch';
import { StoreProduct } from './product/product';
import { StoreProductStatus } from './product/status/status';
import { StoreTableSelectedItem } from './table/selectedItem/selectedItem';
import { StoreTaskAdd } from './task/add/add';
import { StoreTaskDelete } from './task/delete/delete';
import { StoreTaskFetch } from './task/fetch/fetch';
import { StoreTaskStatus } from './task/status/status';
import { StoreTask } from './task/task';

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
  delete: StoreProductDelete;
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

interface IStorePopup {
  status: StorePopupStatus;
  form: {
    product: StorePopupFormProduct;
    task: StorePopupFormTask;
    utils: {
      utils: StorePopupFormUtils;
      error: StorePopupFormUtilsError;
    };
    state: StorePopupForm;
  };
  select: {
    points: StorePopupSelectPoints;
    warehousePoints: StorePopupSelectWarehousePoints;
    products: StorePopupSelectProducts;
    utils: {
      utils: StorePopupSelectUtils;
      floorSpace: StorePopupSelectUtilsFloorSpace;
    };
  };
  windows: {
    confirm: StorePopupWindowConfirm;
    information: StorePopupWindowInformation;
  };
}

interface IStoreTable {
  selectedItem: StoreTableSelectedItem;
}

class RootStore {
  private static instance: RootStore;

  public storeTask: IStoreTask;

  public storeProduct: IStoreProduct;

  public storeMap: IStoreMap;

  public storePoint: IStorePoint;

  public storeCategory: IStoreCategory;

  public storePopup: IStorePopup;

  public storeTable: IStoreTable;

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
      delete: new StoreProductDelete(this),
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

    this.storePopup = {
      status: new StorePopupStatus(this),
      form: {
        product: new StorePopupFormProduct(this),
        task: new StorePopupFormTask(this),
        utils: {
          utils: new StorePopupFormUtils(this),
          error: new StorePopupFormUtilsError(this),
        },
        state: new StorePopupForm(this),
      },
      select: {
        points: new StorePopupSelectPoints(this),
        warehousePoints: new StorePopupSelectWarehousePoints(this),
        products: new StorePopupSelectProducts(this),
        utils: {
          utils: new StorePopupSelectUtils(this),
          floorSpace: new StorePopupSelectUtilsFloorSpace(this),
        },
      },
      windows: {
        confirm: new StorePopupWindowConfirm(this),
        information: new StorePopupWindowInformation(this),
      },
    };

    this.storeTable = {
      selectedItem: new StoreTableSelectedItem(this),
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
