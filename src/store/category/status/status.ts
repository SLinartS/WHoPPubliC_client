import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TStatus } from '../../type';

export type TCategoryStatus = 'fetch';

export class StoreCategoryStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  public get(title: TCategoryStatus) {
    return this[title];
  }

  public set(title: TCategoryStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
