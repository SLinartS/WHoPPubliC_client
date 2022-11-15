import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { ITasks } from './type';

export class StoreTask {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _acceptanceList: ITasks = { data: [], tableHeader: [] };

  public get acceptanceList() {
    return this._acceptanceList;
  }

  public set acceptanceList(newList: ITasks) {
    this._acceptanceList = newList;
  }

  private _shipmentList: ITasks = { data: [], tableHeader: [] };

  public get shipmentList() {
    return this._shipmentList;
  }

  public set shipmentList(newList: ITasks) {
    this._shipmentList = newList;
  }
}
