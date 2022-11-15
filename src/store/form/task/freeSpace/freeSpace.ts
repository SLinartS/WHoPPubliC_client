import { makeAutoObservable } from 'mobx';

import RootStore from '../../../root';

export class StoreFormTaskFreeSpace {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _freeFloorSpace: number = 0;

  public get freeFloorSpace() {
    return this._freeFloorSpace;
  }

  public set freeFloorSpace(newFloorSpace: number) {
    this._freeFloorSpace = newFloorSpace;
  }

  public changeFreeFloorSpace(isAdd: boolean, space: number) {
    if (isAdd) {
      this._freeFloorSpace += space;
    } else {
      this._freeFloorSpace -= space;
    }
  }

  public clearFreeFloorSpace() {
    this._freeFloorSpace = 0;
  }
}
