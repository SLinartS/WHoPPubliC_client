import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { ISelectedItems } from './type';

export class StoreTableSelectedItem {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private itemId: ISelectedItems = {
    acceptanceTasks: 0,
    shipmentTasks: 0,
    products: 0,
  };

  public getItemId(ItemType: keyof ISelectedItems) {
    return this.itemId[ItemType];
  }

  public setItemId(ItemType: keyof ISelectedItems, newTaskId: number) {
    this.itemId[ItemType] = newTaskId;
  }
}
