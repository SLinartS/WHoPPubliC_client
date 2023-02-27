import RootStore from '@store/root';
import { TStatus } from '@store/type';
import { makeAutoObservable } from 'mobx';

export type TPerformanceReportStatus =
  | 'fetch'
  | 'store'
  | 'download'
  | 'destroy';

export class StorePerformanceReportStatus {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private fetch: TStatus = 'pending';

  private store: TStatus = 'pending';

  private download: TStatus = 'pending';

  private destroy: TStatus = 'pending';

  public get(title: TPerformanceReportStatus) {
    return this[title];
  }

  public set(title: TPerformanceReportStatus, newStatus: TStatus) {
    this[title] = newStatus;
  }
}
