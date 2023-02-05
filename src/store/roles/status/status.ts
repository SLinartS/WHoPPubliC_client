import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TStatus } from '../../type';

export type TRoleStatus = 'fetch';

export class StoreRoleStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  public get(title: TRoleStatus) {
    return this[title];
  }

  public set(title: TRoleStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
