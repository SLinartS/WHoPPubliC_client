import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IZone } from './type';

export class StoreMap {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _map: IZone[] = [];

  public get map() {
    return this._map;
  }

  public set map(newMap: IZone[]) {
    this._map = newMap;
  }
}
