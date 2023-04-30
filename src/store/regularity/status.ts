import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TRegularityStatus = 'fetch';

export class StoreRegularityStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  public get(title: TRegularityStatus) {
    return this[title];
  }

  public set(title: TRegularityStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
