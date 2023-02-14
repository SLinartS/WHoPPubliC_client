import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TAuthorizationStatus = 'auth' | 'logout';

export class StoreAuthorizationStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private auth: TStatus = 'pending';

  private logout: TStatus = 'pending';

  public get(title: TAuthorizationStatus) {
    return this[title];
  }

  public set(title: TAuthorizationStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
