import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IUserData } from './type';

export class StoreStateUser {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private userData: IUserData = {
    isAuth: false,
    id: 0,
    login: '',
    name: 'Евгений Иванович Петров',
    role: 'worker',
  };

  public checkIsAuth(): boolean {
    return this.userData.isAuth;
  }

  public getUserData(): IUserData {
    return this.userData;
  }
}
