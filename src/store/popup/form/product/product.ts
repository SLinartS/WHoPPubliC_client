import FormFieldValidator from '@helpers/formValidator/formFieldValidator';
import deepCopy from '@utils/deepCopy/deepCopy';
import { makeAutoObservable, toJS } from 'mobx';

import RootStore from '../../../root';
import { INITIAL_VALUE } from '../config';
import { IProductFormDataFields } from './type';

export class StorePopupFormProduct {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialFormData: IProductFormDataFields = {
    id: INITIAL_VALUE,
    article: INITIAL_VALUE,
    title: INITIAL_VALUE,
    author: INITIAL_VALUE,
    yearOfPublication: INITIAL_VALUE,
    number: INITIAL_VALUE,
    printDate: INITIAL_VALUE,
    printingHouse: INITIAL_VALUE,
    publishingHouse: INITIAL_VALUE,
    categoryId: {
      value: '1',
      errors: [],
    },
  };

  private _formData: IProductFormDataFields = deepCopy(this.initialFormData);

  public get formData() {
    return this._formData;
  }

  public getFormField(field: keyof IProductFormDataFields) {
    return this._formData[field].value;
  }

  public getFormErrors(field: keyof IProductFormDataFields) {
    return toJS(this._formData[field].errors);
  }

  public setFormField(field: keyof IProductFormDataFields, value: string) {
    const trimValue = value.trim();
    const validator = new FormFieldValidator(trimValue);
    switch (field) {
      case 'article':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(10)
          .hasOnlyLetterAndDigits();
        break;

      case 'title':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(30)
          .hasOnlyLetterAndDigits();
        break;

      case 'author':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(30)
          .hasOnlyLetterAndDigits();
        break;

      case 'yearOfPublication':
        validator.notEmpty().hasOnlyDigits().minLength(4).maxLength(4);
        break;

      case 'number':
        validator.notEmpty().hasOnlyDigits().outOfRange(1, 100000);
        break;

      case 'printDate':
        validator.notEmpty().dateFormat('dd.MM.yyyy', 'дд.ММ.гггг');
        break;

      case 'printingHouse':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(30)
          .hasOnlyLetterAndDigits();
        break;

      case 'publishingHouse':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(30)
          .hasOnlyLetterAndDigits();
        break;
      default:
    }
    this._formData[field].value = trimValue;
    this.checkErrorsExist(validator.errors, field);
  }

  private checkErrorsExist(
    errors: string[] | false,
    field: keyof IProductFormDataFields,
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
