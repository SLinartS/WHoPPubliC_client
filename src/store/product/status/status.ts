import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TStatus } from '../../type';

export type TProductStatus = 'fetch' | 'fetchOne' | 'add' | 'delete' | 'update';

export class StoreProductStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  private fetchOne: TStatus = 'pending';

  private add: TStatus = 'pending';

  private delete: TStatus = 'pending';

  private update: TStatus = 'pending';

  public get(title: TProductStatus) {
    return this[title];
  }

  public set(title: TProductStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
