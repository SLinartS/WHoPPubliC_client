import { makeAutoObservable, toJS } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import FormFieldValidator from '../../../../utils/formValidator/formFieldValidator';
import RootStore from '../../../root';
import { INITIAL_VALUE } from '../config';
import { ITaskFormDataFields } from './type';

export class StorePopupFormTask {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialFormData: ITaskFormDataFields = {
    article: INITIAL_VALUE,
    dateStart: INITIAL_VALUE,
    dateEnd: INITIAL_VALUE,
  };

  private _formData: ITaskFormDataFields = deepCopy(this.initialFormData);

  public get formData() {
    return this._formData;
  }

  public getFormField(field: keyof ITaskFormDataFields) {
    return this._formData[field].value;
  }

  public getFormErrors(field: keyof ITaskFormDataFields) {
    return toJS(this._formData[field].errors);
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

  public clearFormData() {
    this._formData = deepCopy(this.initialFormData);
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