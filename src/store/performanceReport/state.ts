import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IPerformanceReport } from './type';

export class StorePerformanceReport {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _reports: IPerformanceReport[] = [];

  public get reports() {
    return this._reports;
  }

  public set reports(newReports: IPerformanceReport[]) {
    this._reports = newReports;
  }
}
