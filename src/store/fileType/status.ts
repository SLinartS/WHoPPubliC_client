import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TProductTypeStatus = 'fetch';

export class StoreFileTypeStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  public get(title: TProductTypeStatus) {
    return this[title];
  }

  public set(title: TProductTypeStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
