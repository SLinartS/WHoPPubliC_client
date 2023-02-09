import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IUser } from './type';

export class StoreStateUser {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _userData: IUser = {
    id: 0,
    login: '',
    name: 'Евгений Иванович Петров',
    role: 'admin',
    roleAlias: 'Администратор',
  };

  private _isAuth: boolean = false;

  public get isAuth(): boolean {
    return this._isAuth;
  }

  public get userData(): IUser {
    return this._userData;
  }
}
