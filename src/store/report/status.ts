import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TReportStatus = 'fetch' | 'store' | 'download' | 'destroy';

export class StoreReportStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  private store: TStatus = 'pending';

  private download: TStatus = 'pending';

  private destroy: TStatus = 'pending';

  public get(title: TReportStatus) {
    return this[title];
  }

  public set(title: TReportStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
