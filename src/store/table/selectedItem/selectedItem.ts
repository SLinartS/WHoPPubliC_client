import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TTaskType } from '../../type';
import { TSelectedItems, TSelectedProducts, TSelectedUsers } from './type';

export class StoreTableSelectedItem {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private itemId: TSelectedItems = {
    tasks: {
      acceptance: 0,
      shipment: 0,
      intra: 0,
    },
    products: {
      products: 0,
    },
    users: {
      users: 0,
    },
  };

  public getItemId(
    itemType: keyof TSelectedItems,
    itemName: TTaskType | TSelectedProducts | TSelectedUsers,
  ) {
    switch (itemType) {
      case 'tasks':
        return this.itemId[itemType][itemName as TTaskType];
      case 'products':
        return this.itemId[itemType][itemName as TSelectedProducts];
      case 'users':
        return this.itemId[itemType][itemName as TSelectedUsers];
      default:
        return 0;
    }
  }

  public setItemId(
    itemType: keyof TSelectedItems,
    itemName: TTaskType | TSelectedProducts | TSelectedUsers,
    newTaskId: number,
  ) {
    switch (itemType) {
      case 'tasks':
        this.itemId[itemType][itemName as TTaskType] = newTaskId;
        break;
      case 'products':
        this.itemId[itemType][itemName as TSelectedProducts] = newTaskId;
        break;
      case 'users':
        this.itemId[itemType][itemName as TSelectedUsers] = newTaskId;
        break;
      default:
    }
  }
}
