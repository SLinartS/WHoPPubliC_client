import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TPointStatus = 'fetch';

export class StorePointStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  public get(title: TPointStatus) {
    return this[title];
  }

  public set(title: TPointStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
