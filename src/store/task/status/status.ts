import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TStatus } from '../../type';

export type TTaskStatus =
  | 'fetchAcceptance'
  | 'fetchShipment'
  | 'delete'
  | 'add';

export class StoreTaskStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetchAcceptance: TStatus = 'pending';

  private fetchShipment: TStatus = 'pending';

  private delete: TStatus = 'pending';

  private add: TStatus = 'pending';

  public get(title: TTaskStatus) {
    return this[title];
  }

  public set(title: TTaskStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
