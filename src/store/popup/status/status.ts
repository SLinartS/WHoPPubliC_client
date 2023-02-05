import { makeAutoObservable, runInAction } from 'mobx';

import RootStore from '../../root';
import { IPopups, TPopups } from './type';

export class StorePopupStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private static doActionWithDelay(action?: () => void) {
    if (action) {
      setTimeout(() => {
        runInAction(() => {
          action();
        });
      }, 200);
    }
  }

  private popups: IPopups = {
    formProduct: false,
    formTask: false,
    formMap: false,
    formAccount: false,
    viewTask: false,
    viewLocation: false,
    selectMap: false,
    selectPoints: false,
    selectProducts: false,
    windowConfirm: false,
    windowInformation: false,
  };

  public getStatus(popupName: TPopups) {
    return this.popups[popupName];
  }

  public show(popupName: TPopups, doActionBeforeShow?: () => void) {
    if (doActionBeforeShow) {
      doActionBeforeShow();
      StorePopupStatus.doActionWithDelay(() => {
        this.popups[popupName] = true;
      });
    } else {
      this.popups[popupName] = true;
    }
  }

  public hide(popupName: TPopups, doActionAfterHide?: () => void) {
    this.popups[popupName] = false;
    if (doActionAfterHide) {
      StorePopupStatus.doActionWithDelay(doActionAfterHide);
    }
  }
}
