import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TStatus, TTaskType } from '../../type';
import { TTaskFetch, TTaskStatus } from './type';

export class StoreTaskStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TTaskFetch = {
    acceptance: 'pending',
    shipment: 'pending',
    intra: 'pending',
  };

  private fetchOne: TStatus = 'pending';

  private delete: TStatus = 'pending';

  private add: TStatus = 'pending';

  private update: TStatus = 'pending';

  public getFetch(taskType: TTaskType) {
    return this.fetch[taskType];
  }

  public setFetch(taskType: TTaskType, newStatus: TStatus) {
    this.fetch[taskType] = newStatus;
  }

  public get(title: TTaskStatus) {
    return this[title];
  }

  public set(title: TTaskStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
