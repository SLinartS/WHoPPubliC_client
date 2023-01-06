import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { TTaskType } from '../type';

export class StoreStateInterface {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private isShowPopupNav: boolean = false;

  public getIsShowPopupNav() {
    return this.isShowPopupNav;
  }

  public showPopupNav() {
    this.isShowPopupNav = true;
  }

  public hidePopupNav() {
    this.isShowPopupNav = false;
  }

  private isViewHeader: boolean = true;

  public getIsViewHeader() {
    return this.isViewHeader;
  }

  public showViewHeader() {
    this.isViewHeader = true;
  }

  public hideViewHeader() {
    this.isViewHeader = false;
  }

  private currentTypeOfTask: TTaskType = 'acceptance';

  public getCurrentTypeOfTask() {
    return this.currentTypeOfTask;
  }

  public changeCurrentTypeOfTask(newType: TTaskType) {
    this.currentTypeOfTask = newType;
  }
}
