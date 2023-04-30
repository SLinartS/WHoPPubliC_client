import { IOption } from '@store/category/type';
import { makeAutoObservable } from 'mobx';

import RootStore from '../root';

export class StoreRegularity {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _regularities: IOption[] = [];

  public get regularities() {
    return this._regularities.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }

  public set regularities(newRegularities: IOption[]) {
    this._regularities = newRegularities;
  }
}
