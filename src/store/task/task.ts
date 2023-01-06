import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { ITasks } from './type';

export class StoreTask {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _acceptanceList: ITasks = { data: [] };

  public get acceptanceList() {
    return this._acceptanceList;
  }

  public set acceptanceList(newList: ITasks) {
    this._acceptanceList = newList;
  }

  private _shipmentList: ITasks = { data: [] };

  public get shipmentList() {
    return this._shipmentList;
  }

  public set shipmentList(newList: ITasks) {
    this._shipmentList = newList;
  }

  private _intraList: ITasks = { data: [] };

  public get intraList() {
    return this._intraList;
  }

  public set intraList(newList: ITasks) {
    this._intraList = newList;
  }
}
