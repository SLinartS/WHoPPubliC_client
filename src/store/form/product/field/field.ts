import { makeAutoObservable, toJS } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import FormFieldValidator from '../../../../utils/formValidator/formFieldValidator';
import RootStore from '../../../root';
import { INITIAL_VALUE } from '../../utils/config';
import { IProductFormDataFields } from './type';

export class StoreFormProductField {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialFormData: IProductFormDataFields = {
    article: INITIAL_VALUE,
    title: INITIAL_VALUE,
    author: INITIAL_VALUE,
    yearOfPublication: INITIAL_VALUE,
    number: INITIAL_VALUE,
    printDate: INITIAL_VALUE,
    printingHouse: INITIAL_VALUE,
    publishingHouse: INITIAL_VALUE,
    categoryId: INITIAL_VALUE,
  };

  private _formData: IProductFormDataFields = deepCopy(this.initialFormData);

  public clearFormData() {
    this._formData = deepCopy(this.initialFormData);
  }

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
    const validator = new FormFieldValidator(value);
    switch (field) {
      case 'article':
        validator.notEmpty().minLength(4).maxLength(10);
        break;

      case 'title':
        validator.notEmpty().minLength(4).maxLength(30);
        break;

      case 'author':
        validator.notEmpty().minLength(4).maxLength(30);
        break;

      case 'yearOfPublication':
        validator.notEmpty().hasOnlyDigits().minLength(4).maxLength(4);
        break;

      case 'number':
        validator.notEmpty().hasOnlyDigits().outOfRange(1, 100000);
        break;

      case 'printDate':
        validator.notEmpty().dateFormat('yyyy-MM-dd');
        break;

      case 'printingHouse':
        validator.notEmpty().minLength(4).maxLength(30);
        break;

      case 'publishingHouse':
        validator.notEmpty().minLength(4).maxLength(30);
        break;

      case 'categoryId':
        validator.categorySelected();
        break;

      default:
    }
    this._formData[field].value = value;
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
}