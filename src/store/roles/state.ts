import { TUserRole } from '@store/authorization/type';
import { IOption } from '@store/category/type';
import { makeAutoObservable } from 'mobx';

import RootStore from '../root';

export class StoreRole {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _roles: IOption<TUserRole>[] = [];

  public get roles() {
    return this._roles.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }

  public set roles(newRoles: IOption<TUserRole>[]) {
    this._roles = newRoles;
  }
}
