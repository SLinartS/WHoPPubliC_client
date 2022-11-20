import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { IWindowConfirmSettings } from './type';

export class StoreWindowConfirm {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly _initialSettings: IWindowConfirmSettings = {
    title: 'testTitle',
    firstButtonEvent: () => '',
    secondButtonEvent: () => '',
  };

  private _setting: IWindowConfirmSettings = { ...this._initialSettings };

  public get setting() {
    return this._setting;
  }

  public set setting(newSetting: IWindowConfirmSettings) {
    this._setting = newSetting;
  }
}
