import { makeAutoObservable } from 'mobx';

import RootStore from '../root';

export class StorePopup {
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
    StorePopup.doActionAfterHide(actionAfterHide);
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
    StorePopup.doActionAfterHide(actionAfterHide);
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
    StorePopup.doActionAfterHide(actionAfterHide);
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
    StorePopup.doActionAfterHide(actionAfterHide);
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
    StorePopup.doActionAfterHide(actionAfterHide);
  }
}
