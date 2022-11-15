import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TStatus } from '../../type';

export type TMapStatus = 'fetch';

export class StoreMapStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  Status of receiving
      data from the server  */
  private fetch: TStatus = 'pending';

  public get(title: TMapStatus) {
    return this[title];
  }

  public set(title: TMapStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
