import { makeAutoObservable } from 'mobx';

import FormFieldValidator from '../../../../utils/formValidator/formFieldValidator';
import RootStore from '../../../root';
import { ITaskFormDataFields } from './type';

export class StoreFormTaskField {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  private _formData: ITaskFormDataFields = {
    article: {
      value: '',
      errors: [],
    },
    dateStart: {
      value: '',
      errors: [],
    },
    dateEnd: {
      value: '',
      errors: [],
    },
  };

  public get formData() {
    return this._formData;
  }

  public getFormField(field: keyof ITaskFormDataFields) {
    return this._formData[field].value;
  }

  public getFormErrors(field: keyof ITaskFormDataFields) {
    return this._formData[field].errors;
  }

  public setFormField(field: keyof ITaskFormDataFields, value: string) {
    const validator = new FormFieldValidator(value);
    switch (field) {
      case 'article':
        validator.notEmpty().minLength(4).maxLength(10);
        break;

      case 'dateStart':
        validator.notEmpty().dateFormat('yyyy-MM-dd');
        break;

      case 'dateEnd':
        validator.notEmpty().dateFormat('yyyy-MM-dd');
        break;

      default:
    }
    this._formData[field].value = value;
    this.checkErrorsExist(validator.errors, field);
  }

  private checkErrorsExist(
    errors: string[] | false,
    field: keyof ITaskFormDataFields,
  ) {
    if (errors) {
      this._formData[field].errors = errors;
    } else {
      this._formData[field].errors = [];
    }
  }
}
