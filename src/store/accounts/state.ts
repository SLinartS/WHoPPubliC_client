import { INITIAL_VALUE_NUMBER, INITIAL_VALUE_STRING } from '@store/constants';
import deepCopy from '@utils/deepCopy/deepCopy';
import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IAccount } from './type';

export class StoreAccount {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialOneAccount: IAccount = {
    id: INITIAL_VALUE_NUMBER,
    email: INITIAL_VALUE_STRING,
    phone: INITIAL_VALUE_STRING,
    login: INITIAL_VALUE_STRING,
    password: INITIAL_VALUE_STRING,
    name: INITIAL_VALUE_STRING,
    surname: INITIAL_VALUE_STRING,
    patronymic: INITIAL_VALUE_STRING,
    roleAlias: INITIAL_VALUE_STRING,
    roleId: INITIAL_VALUE_NUMBER,
  };

  private _accounts: IAccount[] = [];

  public get accounts() {
    return this._accounts;
  }

  public set accounts(newAccounts: IAccount[]) {
    this._accounts = newAccounts;
  }

  private _account: IAccount = deepCopy(this.initialOneAccount);

  public get account() {
    return this._account;
  }

  public set account(newAccount: IAccount) {
    this._account = newAccount;
  }
}
