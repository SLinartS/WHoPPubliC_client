import { configure } from 'mobx';

import { StoreActionDelete } from './action/delete/delete';
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
import { StorePopupSelectFloors } from './popup/select/floors/floors';
import { StorePopupSelectPoints } from './popup/select/points/points';
import { StorePopupSelectProducts } from './popup/select/products/products';
import { StorePopupSelectUtilsFloorSpace } from './popup/select/utils/floorSpace/floorSpace';
import { StorePopupSelectUtils } from './popup/select/utils/utils';
import { StorePopupStatus } from './popup/status/status';
import { StorePopupViewProduct } from './popup/view/product';
import { StorePopupWindowConfirm } from './popup/window/confirm/confirm';
import { StorePopupWindowInformation } from './popup/window/information/information';
import { StoreProductAdd } from './product/add/add';
import { StoreProductDelete } from './product/delete/delete';
import { StoreProductFetch } from './product/fetch/fetch';
import { StoreProductMarkAsMoved } from './product/markAsMoved/markAsMoved';
import { StoreProduct } from './product/product';
import { StoreProductStatus } from './product/status/status';
import { StoreProductUpdate } from './product/update/update';
import { StoreStateCheckMark } from './state/checkMark';
import { StoreStateInterface } from './state/interface';
import { StoreStateUser } from './state/user';
import { StoreTableSelectedItem } from './table/selectedItem/selectedItem';
import { StoreTableUtils } from './table/utils';
import { StoreTaskAdd } from './task/add/add';
import { StoreTaskDelete } from './task/delete/delete';
import { StoreTaskFetch } from './task/fetch/fetch';
import { StoreTaskStatus } from './task/status/status';
import { StoreTask } from './task/task';
import { StoreTaskUpdate } from './task/update/update';

configure({
  enforceActions: 'always',
});

interface IStoreAction {
  delete: StoreActionDelete;
}

interface IStoreState {
  interface: StoreStateInterface;
  checkMark: StoreStateCheckMark;
  user: StoreStateUser;
}

interface IStoreTask {
  state: StoreTask;
  status: StoreTaskStatus;
  fetch: StoreTaskFetch;
  add: StoreTaskAdd;
  update: StoreTaskUpdate;
  delete: StoreTaskDelete;
}

interface IStoreProduct {
  state: StoreProduct;
  status: StoreProductStatus;
  fetch: StoreProductFetch;
  add: StoreProductAdd;
  update: StoreProductUpdate;
  delete: StoreProductDelete;
  markAsMoved: StoreProductMarkAsMoved;
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
    floors: StorePopupSelectFloors;
    products: StorePopupSelectProducts;
    utils: {
      utils: StorePopupSelectUtils;
      floorSpace: StorePopupSelectUtilsFloorSpace;
    };
  };
  view: {
    product: StorePopupViewProduct;
  };
  windows: {
    confirm: StorePopupWindowConfirm;
    information: StorePopupWindowInformation;
  };
}

interface IStoreTable {
  selectedItem: StoreTableSelectedItem;
  utils: StoreTableUtils;
}

class RootStore {
  private static instance: RootStore;

  public storeAction: IStoreAction;

  public storeState: IStoreState;

  public storeTask: IStoreTask;

  public storeProduct: IStoreProduct;

  public storeMap: IStoreMap;

  public storePoint: IStorePoint;

  public storeCategory: IStoreCategory;

  public storePopup: IStorePopup;

  public storeTable: IStoreTable;

  private constructor() {
    this.storeAction = {
      delete: new StoreActionDelete(this),
    };

    this.storeState = {
      interface: new StoreStateInterface(this),
      checkMark: new StoreStateCheckMark(this),
      user: new StoreStateUser(this),
    };

    this.storeTask = {
      state: new StoreTask(this),
      status: new StoreTaskStatus(this),
      fetch: new StoreTaskFetch(this),
      add: new StoreTaskAdd(this),
      update: new StoreTaskUpdate(this),
      delete: new StoreTaskDelete(this),
    };

    this.storeProduct = {
      state: new StoreProduct(this),
      status: new StoreProductStatus(this),
      fetch: new StoreProductFetch(this),
      add: new StoreProductAdd(this),
      update: new StoreProductUpdate(this),
      delete: new StoreProductDelete(this),
      markAsMoved: new StoreProductMarkAsMoved(this),
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
        floors: new StorePopupSelectFloors(this),
        products: new StorePopupSelectProducts(this),
        utils: {
          utils: new StorePopupSelectUtils(this),
          floorSpace: new StorePopupSelectUtilsFloorSpace(this),
        },
      },
      view: {
        product: new StorePopupViewProduct(this),
      },
      windows: {
        confirm: new StorePopupWindowConfirm(this),
        information: new StorePopupWindowInformation(this),
      },
    };

    this.storeTable = {
      selectedItem: new StoreTableSelectedItem(this),
      utils: new StoreTableUtils(this),
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
