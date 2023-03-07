import FormFieldValidator from '@helpers/formValidator/formFieldValidator';
import { makeAutoObservable, toJS } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { INITIAL_VALUE } from '../config';
import { ITaskFormDataFields } from './type';

export class StorePopupFormTask {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialFormData: ITaskFormDataFields = {
    id: INITIAL_VALUE,
    article: INITIAL_VALUE,
    timeStart: INITIAL_VALUE,
    dateStart: INITIAL_VALUE,
    timeEnd: INITIAL_VALUE,
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
    const trimValue = value.trim();
    const validator = new FormFieldValidator(trimValue);
    switch (field) {
      case 'article':
        validator.notEmpty().minLength(4).maxLength(10);
        break;

      case 'dateStart':
      case 'dateEnd':
        validator.notEmpty().dateFormat('dd.MM.yyyy', 'дд.ММ.гггг');
        break;

      case 'timeStart':
      case 'timeEnd':
        validator.notEmpty().dateFormat('HH:mm', 'чч:мм');
        break;

      default:
    }
    this._formData[field].value = trimValue;
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
