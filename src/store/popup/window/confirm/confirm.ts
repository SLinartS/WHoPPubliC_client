import { makeAutoObservable } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { IWindowsConfirm } from './type';

export class StorePopupWindowConfirm {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialSettings: IWindowsConfirm = {
    variant: 'deleteProduct',
    itemType: 'products',
    itemName: 'products',
    itemId: 0,
    text: '',
  };

  private settings: IWindowsConfirm = deepCopy(this.initialSettings);

  public getSetting() {
    return this.settings;
  }

  public setSetting(newSettings: IWindowsConfirm) {
    this.settings = newSettings;
  }
}
