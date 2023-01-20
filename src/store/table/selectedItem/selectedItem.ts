import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TTaskType } from '../../type';
import { TSelectedItems, TSelectedProducts } from './type';

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
  };

  public getItemId(
    itemType: keyof TSelectedItems,
    itemName: TTaskType | TSelectedProducts,
  ) {
    switch (itemType) {
      case 'tasks':
        return this.itemId[itemType][itemName as TTaskType];
      case 'products':
        return this.itemId[itemType][itemName as TSelectedProducts];
      default:
        return 0;
    }
  }

  public setItemId(
    itemType: keyof TSelectedItems,
    itemName: TTaskType | TSelectedProducts,
    newTaskId: number,
  ) {
    switch (itemType) {
      case 'tasks':
        this.itemId[itemType][itemName as TTaskType] = newTaskId;
        break;
      case 'products':
        this.itemId[itemType][itemName as TSelectedProducts] = newTaskId;
        break;
      default:
    }
  }
}
