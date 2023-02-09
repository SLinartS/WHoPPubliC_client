import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TUserStatus = 'fetch' | 'show' | 'store' | 'update' | 'destroy';

export class StoreUserStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  private show: TStatus = 'pending';

  private store: TStatus = 'pending';

  private update: TStatus = 'pending';

  private destroy: TStatus = 'pending';

  public get(title: TUserStatus) {
    return this[title];
  }

  public set(title: TUserStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
