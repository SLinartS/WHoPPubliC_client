import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';

export class StorePopupStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private static doActionAfterHide(actionAfterHide?: () => void) {
    if (actionAfterHide) {
      setTimeout(() => {
        actionAfterHide();
      }, 200);
    }
  }

  /*
    ProductForm
   */
  private productForm: boolean = false;

  public get productFormStatus() {
    return this.productForm;
  }

  public showProductForm() {
    this.productForm = true;
  }

  public hideProductForm(actionAfterHide?: () => void) {
    this.productForm = false;
    StorePopupStatus.doActionAfterHide(actionAfterHide);
  }

  /*
    TaskForm
   */
  private taskForm: boolean = false;

  public get taskFormStatus() {
    return this.taskForm;
  }

  public showTaskForm() {
    this.taskForm = true;
  }

  public hideTaskForm(actionAfterHide?: () => void) {
    this.taskForm = false;
    StorePopupStatus.doActionAfterHide(actionAfterHide);
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
    StorePopupStatus.doActionAfterHide(actionAfterHide);
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
    StorePopupStatus.doActionAfterHide(actionAfterHide);
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
    StorePopupStatus.doActionAfterHide(actionAfterHide);
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
    StorePopupStatus.doActionAfterHide(actionAfterHide);
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
    StorePopupStatus.doActionAfterHide(actionAfterHide);
  }
}
