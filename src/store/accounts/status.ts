import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TAccountStatus = 'fetch' | 'show' | 'create' | 'update' | 'destroy';

export class StoreAccountStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  private show: TStatus = 'pending';

  private create: TStatus = 'pending';

  private update: TStatus = 'pending';

  private destroy: TStatus = 'pending';

  public get(title: TAccountStatus) {
    return this[title];
  }

  public set(title: TAccountStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
