import { configure } from 'mobx';

import { StoreAudienceAction } from './audience/action';
import { StoreAudience } from './audience/state';
import { StoreAudienceStatus } from './audience/status';
import { StoreAuthorizationAction } from './authorization/action';
import { StoreAuthorization } from './authorization/state';
import { StoreAuthorizationStatus } from './authorization/status';
import { StoreCategoryAction } from './category/action';
import { StoreCategory } from './category/state';
import { StoreCategoryStatus } from './category/status';
import { StoreFileTypeAction } from './fileType/action';
import { StoreFileType } from './fileType/state';
import { StoreFileTypeStatus } from './fileType/status';
import { StoreMapAction } from './map/action';
import { StoreMap } from './map/state';
import { StoreMapStatus } from './map/status';
import { StorePointAction } from './point/action';
import { StorePoint } from './point/state';
import { StorePointStatus } from './point/status';
import { StorePopupForm } from './popup/form/form';
import { StorePopupFormMap } from './popup/form/map/map';
import { StorePopupFormProduct } from './popup/form/product/product';
import { StorePopupFormTask } from './popup/form/task/task';
import { StorePopupFormUser } from './popup/form/user/user';
import { StorePopupSelectFloors } from './popup/select/floors/floors';
import { StorePopupSelectPoints } from './popup/select/points/points';
import { StorePopupSelectProducts } from './popup/select/products/products';
import { StorePopupSelectWorkSchedules } from './popup/select/workSchedules/workSchedules';
import { StorePopupStatus } from './popup/status/status';
import { StorePopupWindowConfirm } from './popup/window/confirm/confirm';
import { StorePopupWindowInformation } from './popup/window/information/information';
import { StoreProductAction } from './product/action';
import { StoreProduct } from './product/state';
import { StoreProductStatus } from './product/status';
import { StoreProductTypeAction } from './productType/action';
import { StoreProductType } from './productType/state';
import { StoreProductTypeStatus } from './productType/status';
import { StoreRegularityAction } from './regularity/action';
import { StoreRegularity } from './regularity/state';
import { StoreRegularityStatus } from './regularity/status';
import { StoreReportAction } from './report/action';
import { StoreReport } from './report/state';
import { StoreReportStatus } from './report/status';
import { StoreRoleAction } from './roles/action';
import { StoreRole } from './roles/state';
import { StoreRoleStatus } from './roles/status';
import { StoreStateCheckMark } from './state/checkMark';
import { StoreStateInterface } from './state/interface';
import { StoreTableSelectedItem } from './table/selectedItem/selectedItem';
import { StoreTableState } from './table/state';
import { StoreTableUtils } from './table/utils';
import { StoreTaskAction } from './task/action';
import { StoreTaskStatus } from './task/status';
import { StoreTask } from './task/task';
import { StoreUserAction } from './user/action';
import { StoreUser } from './user/state';
import { StoreUserStatus } from './user/status';
import { StoreUtils } from './utils/utils';

configure({
  enforceActions: 'always',
});

interface IStoreReport {
  state: StoreReport;
  status: StoreReportStatus;
  action: StoreReportAction;
}

interface IStoreAuthorization {
  state: StoreAuthorization;
  status: StoreAuthorizationStatus;
  action: StoreAuthorizationAction;
}

interface IStoreState {
  interface: StoreStateInterface;
  checkMark: StoreStateCheckMark;
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

interface IStoreUser {
  state: StoreUser;
  status: StoreUserStatus;
  action: StoreUserAction;
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

interface IStoreProductType {
  state: StoreProductType;
  status: StoreProductTypeStatus;
  action: StoreProductTypeAction;
}

interface IStoreFileType {
  state: StoreFileType;
  status: StoreFileTypeStatus;
  action: StoreFileTypeAction;
}

interface IStoreAudience {
  state: StoreAudience;
  status: StoreAudienceStatus;
  action: StoreAudienceAction;
}

interface IStoreRegularity {
  state: StoreRegularity;
  status: StoreRegularityStatus;
  action: StoreRegularityAction;
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
    user: StorePopupFormUser;
    state: StorePopupForm;
  };
  select: {
    points: StorePopupSelectPoints;
    floors: StorePopupSelectFloors;
    products: StorePopupSelectProducts;
    workSchedules: StorePopupSelectWorkSchedules;
  };
  windows: {
    information: StorePopupWindowInformation;
    confirm: StorePopupWindowConfirm;
  };
}

interface IStoreTable {
  state: StoreTableState;
  selectedItem: StoreTableSelectedItem;
  utils: StoreTableUtils;
}

class RootStore {
  private static instance: RootStore;

  public storeReport: IStoreReport;

  public storeAuth: IStoreAuthorization;

  public storeUtils: StoreUtils;

  public storeState: IStoreState;

  public storeTask: IStoreTask;

  public storeProduct: IStoreProduct;

  public storeUser: IStoreUser;

  public storeMap: IStoreMap;

  public storePoint: IStorePoint;

  public storeCategory: IStoreCategory;

  public storeProductType: IStoreProductType;

  public storeFileType: IStoreFileType;

  public storeAudience: IStoreAudience;

  public storeRegularity: IStoreRegularity;

  public storeRole: IStoreRole;

  public storePopup: IStorePopup;

  public storeTable: IStoreTable;

  private constructor() {
    this.storeReport = {
      state: new StoreReport(this),
      status: new StoreReportStatus(this),
      action: new StoreReportAction(this),
    };

    this.storeAuth = {
      state: new StoreAuthorization(this),
      status: new StoreAuthorizationStatus(this),
      action: new StoreAuthorizationAction(this),
    };

    this.storeUtils = new StoreUtils(this);

    this.storeState = {
      interface: new StoreStateInterface(this),
      checkMark: new StoreStateCheckMark(this),
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

    this.storeUser = {
      state: new StoreUser(this),
      status: new StoreUserStatus(this),
      action: new StoreUserAction(this),
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

    this.storeProductType = {
      state: new StoreProductType(this),
      status: new StoreProductTypeStatus(this),
      action: new StoreProductTypeAction(this),
    };

    this.storeFileType = {
      state: new StoreFileType(this),
      status: new StoreFileTypeStatus(this),
      action: new StoreFileTypeAction(this),
    };

    this.storeAudience = {
      state: new StoreAudience(this),
      status: new StoreAudienceStatus(this),
      action: new StoreAudienceAction(this),
    };

    this.storeRegularity = {
      state: new StoreRegularity(this),
      status: new StoreRegularityStatus(this),
      action: new StoreRegularityAction(this),
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
        user: new StorePopupFormUser(this),
        map: new StorePopupFormMap(this),
        state: new StorePopupForm(this),
      },
      select: {
        points: new StorePopupSelectPoints(this),
        floors: new StorePopupSelectFloors(this),
        products: new StorePopupSelectProducts(this),
        workSchedules: new StorePopupSelectWorkSchedules(this),
      },
      windows: {
        information: new StorePopupWindowInformation(this),
        confirm: new StorePopupWindowConfirm(this),
      },
    };

    this.storeTable = {
      state: new StoreTableState(this),
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
