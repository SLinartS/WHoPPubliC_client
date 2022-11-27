import { makeAutoObservable } from 'mobx';

import RootStore from '../../../root';
import { IWindowInformationSettings } from './type';

export class StorePopupWindowInformation {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly _initialSettings: IWindowInformationSettings = {
    text: 'testTitle',
    classes: '',
  };

  private _setting: IWindowInformationSettings = { ...this._initialSettings };

  public get setting() {
    return this._setting;
  }

  public set setting(newSetting: IWindowInformationSettings) {
    this._setting = newSetting;
  }
}
