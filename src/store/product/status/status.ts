import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TStatus } from '../../type';

export type TProductStatus = 'fetch' | 'fetchOfTask' | 'add';

export class StoreProductStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  private fetchOfTask: TStatus = 'done';

  private add: TStatus = 'pending';

  public get(title: TProductStatus) {
    return this[title];
  }

  public set(title: TProductStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
