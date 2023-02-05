import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IAccount } from './type';

export class StoreAccount {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _accounts: IAccount[] = [];

  public get accounts() {
    return this._accounts;
  }

  public set accounts(newAccounts: IAccount[]) {
    this._accounts = newAccounts;
  }
}
