import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TProductStatus =
  | 'fetch'
  | 'show'
  | 'store'
  | 'update'
  | 'destroy'
  | 'markAsMoved';

export class StoreProductStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  private show: TStatus = 'pending';

  private store: TStatus = 'pending';

  private update: TStatus = 'pending';

  private destroy: TStatus = 'pending';

  private markAsMoved: TStatus = 'pending';

  public get(title: TProductStatus) {
    return this[title];
  }

  public set(title: TProductStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
