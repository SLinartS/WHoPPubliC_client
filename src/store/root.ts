import { configure } from 'mobx';

import { StoreAccountAction } from './accounts/action';
import { StoreAccount } from './accounts/state';
import { StoreAccountStatus } from './accounts/status';
import { StoreCategoryAction } from './category/action';
import { StoreCategory } from './category/state';
import { StoreCategoryStatus } from './category/status';
import { StoreMapAction } from './map/action';
import { StoreMap } from './map/state';
import { StoreMapStatus } from './map/status';
import { StorePointAction } from './point/action';
import { StorePoint } from './point/state';
import { StorePointStatus } from './point/status';
import { StorePopupFormAccount } from './popup/form/account/account';
import { StorePopupForm } from './popup/form/form';
import { StorePopupFormMap } from './popup/form/map/map';
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
import { StorePopupWindowConfirm } from './popup/window/confirm/confirm';
import { StorePopupWindowInformation } from './popup/window/information/information';
import { StoreProductAction } from './product/action';
import { StoreProduct } from './product/state';
import { StoreProductStatus } from './product/status';
import { StoreRoleAction } from './roles/action';
import { StoreRole } from './roles/state';
import { StoreRoleStatus } from './roles/status';
import { StoreStateCheckMark } from './state/checkMark';
import { StoreStateInterface } from './state/interface';
import { StoreStateUser } from './state/user';
import { StoreTableSelectedItem } from './table/selectedItem/selectedItem';
import { StoreTableUtils } from './table/utils';
import { StoreTaskAction } from './task/action';
import { StoreTaskStatus } from './task/status';
import { StoreTask } from './task/task';
import { StoreUtils } from './utils/utils';

configure({
  enforceActions: 'always',
});

type IStoreUtils = StoreUtils;

interface IStoreState {
  interface: StoreStateInterface;
  checkMark: StoreStateCheckMark;
  user: StoreStateUser;
}

interface IStoreTask {
  state: StoreTask;
  status: StoreTaskStatus;
  action: StoreTaskAction;
}

interface IStoreProduct {
  state: StoreProduct;
  status: StoreProductStatus;
  action: StoreProductAction;
}

interface IStoreAccount {
  state: StoreAccount;
  status: StoreAccountStatus;
  action: StoreAccountAction;
}

interface IStoreMap {
  state: StoreMap;
  status: StoreMapStatus;
  action: StoreMapAction;
}

interface IStorePoint {
  state: StorePoint;
  status: StorePointStatus;
  action: StorePointAction;
}

interface IStoreCategory {
  state: StoreCategory;
  status: StoreCategoryStatus;
  action: StoreCategoryAction;
}

interface IStoreRole {
  state: StoreRole;
  status: StoreRoleStatus;
  action: StoreRoleAction;
}

interface IStorePopup {
  status: StorePopupStatus;
  form: {
    product: StorePopupFormProduct;
    task: StorePopupFormTask;
    map: StorePopupFormMap;
    account: StorePopupFormAccount;
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
  windows: {
    information: StorePopupWindowInformation;
    confirm: StorePopupWindowConfirm;
  };
}

interface IStoreTable {
  selectedItem: StoreTableSelectedItem;
  utils: StoreTableUtils;
}

class RootStore {
  private static instance: RootStore;

  public storeUtils: IStoreUtils;

  public storeState: IStoreState;

  public storeTask: IStoreTask;

  public storeProduct: IStoreProduct;

  public storeAccount: IStoreAccount;

  public storeMap: IStoreMap;

  public storePoint: IStorePoint;

  public storeCategory: IStoreCategory;

  public storeRole: IStoreRole;

  public storePopup: IStorePopup;

  public storeTable: IStoreTable;

  private constructor() {
    this.storeUtils = new StoreUtils(this);

    this.storeState = {
      interface: new StoreStateInterface(this),
      checkMark: new StoreStateCheckMark(this),
      user: new StoreStateUser(this),
    };

    this.storeTask = {
      state: new StoreTask(this),
      status: new StoreTaskStatus(this),
      action: new StoreTaskAction(this),
    };

    this.storeProduct = {
      state: new StoreProduct(this),
      status: new StoreProductStatus(this),
      action: new StoreProductAction(this),
    };

    this.storeAccount = {
      state: new StoreAccount(this),
      status: new StoreAccountStatus(this),
      action: new StoreAccountAction(this),
    };

    this.storeMap = {
      state: new StoreMap(this),
      status: new StoreMapStatus(this),
      action: new StoreMapAction(this),
    };

    this.storePoint = {
      state: new StorePoint(this),
      status: new StorePointStatus(this),
      action: new StorePointAction(this),
    };

    this.storeCategory = {
      state: new StoreCategory(this),
      status: new StoreCategoryStatus(this),
      action: new StoreCategoryAction(this),
    };

    this.storeRole = {
      state: new StoreRole(this),
      status: new StoreRoleStatus(this),
      action: new StoreRoleAction(this),
    };

    this.storePopup = {
      status: new StorePopupStatus(this),
      form: {
        product: new StorePopupFormProduct(this),
        task: new StorePopupFormTask(this),
        account: new StorePopupFormAccount(this),
        map: new StorePopupFormMap(this),
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
      windows: {
        information: new StorePopupWindowInformation(this),
        confirm: new StorePopupWindowConfirm(this),
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
