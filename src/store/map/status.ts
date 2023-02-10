import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TMapStatus = 'fetch' | 'store' | 'update' | 'destroy';

export class StoreMapStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  Status of receiving
      data from the server  */
  private fetch: TStatus = 'pending';

  private store: TStatus = 'pending';

  private update: TStatus = 'pending';

  private destroy: TStatus = 'pending';

  public get(title: TMapStatus) {
    return this[title];
  }

  public set(title: TMapStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
