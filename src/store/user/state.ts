import { INITIAL_VALUE_NUMBER, INITIAL_VALUE_STRING } from '@store/constants';
import deepCopy from '@utils/deepCopy/deepCopy';
import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IUser } from './type';

export class StoreUser {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialOneUser: IUser = {
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

  private _users: IUser[] = [];

  public get users() {
    return this._users;
  }

  public set users(newUsers: IUser[]) {
    this._users = newUsers;
  }

  private _user: IUser = deepCopy(this.initialOneUser);

  public get user() {
    return this._user;
  }

  public set user(newUser: IUser) {
    this._user = newUser;
  }
}
