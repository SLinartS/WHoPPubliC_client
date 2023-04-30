import { IOption } from '@store/category/type';
import { makeAutoObservable } from 'mobx';

import RootStore from '../root';

export class StoreAudience {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _audiences: IOption[] = [];

  public get audiences() {
    return this._audiences.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }

  public set audiences(newAudiences: IOption[]) {
    this._audiences = newAudiences;
  }
}
