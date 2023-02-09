import RootStore from '@store/root';
import { TStatus, TTaskType } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TTaskStatus = 'fetchOne' | 'delete' | 'add' | 'update';

export type TTaskFetch = { [key in TTaskType]: TStatus };

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
