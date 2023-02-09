import FormFieldValidator from '@helpers/formValidator/formFieldValidator';
import deepCopy from '@utils/deepCopy/deepCopy';
import { makeAutoObservable, toJS } from 'mobx';

import RootStore from '../../../root';
import { INITIAL_VALUE } from '../config';
import { IUserFormDataFields } from './type';

export class StorePopupFormUser {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialFormData: IUserFormDataFields = {
    id: INITIAL_VALUE,
    email: INITIAL_VALUE,
    phone: INITIAL_VALUE,
    login: INITIAL_VALUE,
    password: INITIAL_VALUE,
    name: INITIAL_VALUE,
    surname: INITIAL_VALUE,
    patronymic: INITIAL_VALUE,
    roleId: {
      value: '1',
      errors: [],
    },
  };

  private _formData: IUserFormDataFields = deepCopy(this.initialFormData);

  public get formData() {
    return this._formData;
  }

  public getFormField(field: keyof IUserFormDataFields) {
    return this._formData[field].value;
  }

  public getFormErrors(field: keyof IUserFormDataFields) {
    return toJS(this._formData[field].errors);
  }

  public setFormError(field: keyof IUserFormDataFields, error: string[]) {
    this._formData[field].errors = error;
  }

  public setFormField(field: keyof IUserFormDataFields, value: string) {
    const validator = new FormFieldValidator(value);
    switch (field) {
      case 'email':
        validator.notEmpty().maxLength(30);
        break;

      case 'phone':
        validator.notEmpty().maxLength(30);
        break;

      case 'name':
        validator.notEmpty().minLength(2).maxLength(30);
        break;

      case 'login':
        validator.notEmpty().minLength(6).maxLength(30);
        break;

      case 'password':
        if (this.root.storePopup.form.state.formActionType === 'create') {
          validator.notEmpty().minLength(6).maxLength(30);
        }
        break;

      case 'surname':
        validator.notEmpty().minLength(2).maxLength(30);
        break;

      case 'patronymic':
        validator.notEmpty().maxLength(30);
        break;
      default:
    }
    this._formData[field].value = value;
    this.checkErrorsExist(validator.errors, field);
  }

  private checkErrorsExist(
    errors: string[] | false,
    field: keyof IUserFormDataFields,
  ) {
    if (errors) {
      this._formData[field].errors = errors;
    } else {
      this._formData[field].errors = [];
    }
  }

  public clearFormData() {
    this._formData = deepCopy(this.initialFormData);
  }
}
