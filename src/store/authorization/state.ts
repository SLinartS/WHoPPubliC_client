import FormFieldValidator from '@helpers/formValidator/formFieldValidator';
import { INITIAL_VALUE } from '@store/popup/form/config';
import RootStore from '@store/root';
import deepCopy from '@utils/deepCopy/deepCopy';
import { makeAutoObservable } from 'mobx';

import { IAuthorizationData, IUser } from './type';

export class StoreAuthorization {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialAuthData: IAuthorizationData = {
    login: INITIAL_VALUE,
    password: INITIAL_VALUE,
  };

  private readonly initialUserData: IUser = {
    id: 0,
    login: '',
    name: '',
    token: '',
    role: null,
    roleAlias: '',
  };

  private _auth: IAuthorizationData = deepCopy(this.initialAuthData);

  private _userData: IUser = deepCopy(this.initialUserData);

  public get auth() {
    return this._auth;
  }

  public setAuthField(field: keyof IAuthorizationData, value: string) {
    const trimValue = value.trim();
    const validator = new FormFieldValidator(trimValue);
    switch (field) {
      case 'login':
        validator.notEmpty().hasOnlyValidCharacters();
        break;

      case 'password':
        validator.notEmpty().hasOnlyValidCharacters();
        break;
      default:
    }
    this.auth[field].value = trimValue;
    this.checkErrorsExist(validator.errors, field);
  }

  public clearAuth() {
    this._auth = deepCopy(this.initialAuthData);
  }

  public getTokenAuth() {
    return this._userData.token;
  }

  public clearToken() {
    this._userData.token = '';
  }

  public get isAuth(): boolean {
    return Boolean(this._userData.id);
  }

  public get userData(): IUser {
    return this._userData;
  }

  public set userData(newUserData: IUser) {
    this._userData = newUserData;
  }

  private checkErrorsExist(
    errors: string[] | false,
    field: keyof IAuthorizationData,
  ) {
    if (errors) {
      this._auth[field].errors = errors;
    } else {
      this._auth[field].errors = [];
    }
  }
}
