import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TAudienceStatus = 'fetch';

export class StoreAudienceStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  public get(title: TAudienceStatus) {
    return this[title];
  }

  public set(title: TAudienceStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
