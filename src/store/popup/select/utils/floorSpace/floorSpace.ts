import { makeAutoObservable } from 'mobx';

import RootStore from '../../../../root';

export class StorePopupSelectUtilsFloorSpace {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _freeSpace: number = 0;

  public get freeSpace() {
    return this._freeSpace;
  }

  public set freeSpace(newSpace: number) {
    this._freeSpace = newSpace;
  }

  public changeFreeSpace(isAdd: boolean, space: number) {
    if (isAdd) {
      this._freeSpace += space;
    } else {
      this._freeSpace -= space;
    }
  }

  public clearFreeSpace() {
    this._freeSpace = 0;
  }

  public isEnoughFreeSpace() {
    if (this.getOccupiedSpace() < this._freeSpace) {
      return true;
    }
    return false;
  }

  public getOccupiedSpace(): number {
    let occepiedSpace = 0;
    const productListData =
      this.root.storePopup.select.products.getProductListData();
    for (const product of productListData) {
      occepiedSpace += Number(product.number);
    }
    return occepiedSpace;
  }
}
