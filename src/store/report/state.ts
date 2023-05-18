import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IReport } from './type';

export class StoreReport {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _reports: IReport[] = [];

  public get reports() {
    return this._reports;
  }

  public set reports(newReports: IReport[]) {
    this._reports = newReports;
  }
}
