import FormFieldValidator from '@helpers/formValidator/formFieldValidator';
import { INITIAL_VALUE } from '@store/popup/form/config';
import RootStore from '@store/root';
import { IResponseError } from '@store/type';
import deepCopy from '@utils/deepCopy/deepCopy';
import { makeAutoObservable } from 'mobx';

import { IAuthorizationData, IUserData } from './type';

export class StoreAuthorization {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialAuthData: IAuthorizationData = {
    login: INITIAL_VALUE,
    password: INITIAL_VALUE,
  };

  private readonly initialUserData: IUserData = {
    id: 0,
    login: '',
    name: '',
    role: '',
    roleAlias: '',
  };

  private _userData: IUserData = deepCopy(this.initialUserData);

  public get isAuth(): boolean {
    return Boolean(this._userData.id);
  }

  public get userData(): IUserData {
    return this._userData;
  }

  public set userData(newUserData: IUserData) {
    this._userData = newUserData;
  }

  public clearUserData() {
    this._userData = deepCopy(this.initialUserData);
  }

  private _auth: IAuthorizationData = deepCopy(this.initialAuthData);

  public get auth() {
    return this._auth;
  }

  public setAuthFieldError(errors: IResponseError<keyof IAuthorizationData>) {
    Object.entries(errors).forEach(([fieldName, fieldErrors]) => {
      const typedFieldName = fieldName as keyof IAuthorizationData;
      if (fieldErrors instanceof Array) {
        this._auth[typedFieldName].errors = fieldErrors;
      } else {
        this._auth[typedFieldName].errors = [fieldErrors];
      }
    });
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
