import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';

export class StorePopupStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  // TODO действия не выполняются ДО показа
  private static doActionWithDelay(action?: () => void) {
    if (action) {
      setTimeout(() => {
        action();
      }, 200);
    }
  }

  /*
    FormProduct
   */
  private formProduct: boolean = false;

  public get formProductStatus() {
    return this.formProduct;
  }

  public showFormProduct(actionBeforeShow?: () => void) {
    StorePopupStatus.doActionWithDelay(actionBeforeShow);
    this.formProduct = true;
  }

  public hideFormProduct(actionAfterHide?: () => void) {
    this.formProduct = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }

  /*
    FormTask
   */
  private formTask: boolean = false;

  public get formTaskStatus() {
    return this.formTask;
  }

  public showFormTask() {
    this.formTask = true;
  }

  public hideFormTask(actionAfterHide?: () => void) {
    this.formTask = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }

  /*
    ViewTask
   */
  private viewTask: boolean = false;

  public get viewTaskStatus() {
    return this.viewTask;
  }

  public showViewTask(actionBeforeShow?: () => void) {
    StorePopupStatus.doActionWithDelay(actionBeforeShow);
    this.viewTask = true;
  }

  public hideViewTask(actionAfterHide?: () => void) {
    this.viewTask = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }

  /*
    ViewLocation
   */
  private viewLocation: boolean = false;

  public get viewLocationStatus() {
    return this.viewLocation;
  }

  public showViewLocation(actionBeforeShow?: () => void) {
    StorePopupStatus.doActionWithDelay(actionBeforeShow);
    this.viewLocation = true;
  }

  public hideViewLocation(actionAfterHide?: () => void) {
    this.viewLocation = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }

  /*
    SelectMap
   */
  private selectMap: boolean = false;

  public get selectMapStatus() {
    return this.selectMap;
  }

  public showSelectMap() {
    this.selectMap = true;
  }

  public hideSelectMap(actionAfterHide?: () => void) {
    this.selectMap = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }

  /*
    SelectPoints
   */
  private selectPoints: boolean = false;

  public get selectPointsStatus() {
    return this.selectPoints;
  }

  public showSelectPoints() {
    this.selectPoints = true;
  }

  public hideSelectPoints(actionAfterHide?: () => void) {
    this.selectPoints = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }

  /*
    SelectProducts
   */
  private selectProducts: boolean = false;

  public get selectProductsStatus() {
    return this.selectProducts;
  }

  public showSelectProducts() {
    this.selectProducts = true;
  }

  public hideSelectProducts(actionAfterHide?: () => void) {
    this.selectProducts = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }

  /*
    WindowConfirm
   */
  private windowConfirm: boolean = false;

  public get windowConfirmStatus() {
    return this.windowConfirm;
  }

  public showWindowConfirm() {
    this.windowConfirm = true;
  }

  public hideWindowConfirm(actionAfterHide?: () => void) {
    this.windowConfirm = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }

  /*
    WindowInformation
   */
  private windowInformation: boolean = false;

  public get windowInformationStatus() {
    return this.windowInformation;
  }

  public showWindowInformation() {
    this.windowInformation = true;
  }

  public hideWindowInformation(actionAfterHide?: () => void) {
    this.windowInformation = false;
    StorePopupStatus.doActionWithDelay(actionAfterHide);
  }
}
