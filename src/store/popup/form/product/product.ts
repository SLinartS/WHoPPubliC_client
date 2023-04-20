import FormFieldValidator from '@helpers/formValidator/formFieldValidator';
import deepCopy from '@utils/deepCopy/deepCopy';
import { makeAutoObservable, toJS } from 'mobx';

import RootStore from '../../../root';
import { INITIAL_VALUE } from '../config';
import {
  IFile,
  IProductGeneralDataFields,
  TProductFormDataFields,
  TProductVariousDataFieldsWords,
} from './type';

export class StorePopupFormProduct {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialFormData: TProductFormDataFields = {
    id: INITIAL_VALUE,
    article: INITIAL_VALUE,
    title: INITIAL_VALUE,
    author: INITIAL_VALUE,
    yearOfPublication: INITIAL_VALUE,
    number: INITIAL_VALUE,
    yearOfPrinting: INITIAL_VALUE,
    printingHouse: INITIAL_VALUE,
    publishingHouse: INITIAL_VALUE,
    categoryId: {
      value: '1',
      errors: [],
    },
  };

  private _formData: TProductFormDataFields = deepCopy(this.initialFormData);

  public get formData() {
    return this._formData;
  }

  public getFormField(field: keyof TProductFormDataFields) {
    return this._formData[field].value;
  }

  public getFormErrors(field: keyof TProductFormDataFields) {
    return toJS(this._formData[field].errors);
  }

  public setFormField(
    field: keyof IProductGeneralDataFields | TProductVariousDataFieldsWords,
    value: string,
  ) {
    const trimValue = value.trim();
    const validator = new FormFieldValidator(trimValue);
    switch (field) {
      case 'article':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(10)
          .hasOnlyValidCharacters();
        break;

      case 'title':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(30)
          .hasOnlyValidCharacters();
        break;

      case 'author':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(30)
          .hasOnlyValidCharacters();
        break;

      case 'yearOfPublication':
        validator.notEmpty().hasOnlyDigits().minLength(4).maxLength(4);
        break;

      case 'number':
        validator.notEmpty().hasOnlyDigits().outOfRange(1, 100000);
        break;

      case 'yearOfPrinting':
        validator.notEmpty().dateFormat('dd.MM.yyyy', 'дд.ММ.гггг');
        break;

      case 'printingHouse':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(30)
          .hasOnlyValidCharacters();
        break;

      case 'publishingHouse':
        validator
          .notEmpty()
          .minLength(4)
          .maxLength(30)
          .hasOnlyValidCharacters();
        break;
      default:
    }
    this._formData[field].value = value;
    this.checkErrorsExist(validator.errors, field);
  }

  private _file: IFile = {
    value: null,
    errors: [],
  };

  public getFile() {
    return this._file;
  }

  public setFileValue(file: File) {
    this._file.value = file;
    this._file.errors = [];
  }

  public getFileErrors() {
    return this._file.errors;
  }

  public setFileErrors(errors: string[]) {
    this._file.errors = errors;
  }

  private checkErrorsExist(
    errors: string[] | false,
    field: keyof IProductGeneralDataFields | TProductVariousDataFieldsWords,
  ) {
    if (errors) {
      this._formData[field].errors = errors;
    } else {
      this._formData[field].errors = [];
    }
  }

  public clearFormData() {
    this.root.storePopup.form.product._formData = deepCopy(
      this.initialFormData,
    );
    this._formData = deepCopy(this.initialFormData);
    this._formData = deepCopy(this.initialFormData);
  }
}
