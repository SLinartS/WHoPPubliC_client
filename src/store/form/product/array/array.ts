import { makeAutoObservable, toJS } from 'mobx';

import FormArrayValidator from '../../../../utils/formValidator/formArrayValidator';
import RootStore from '../../../root';
import { INITIAL_ARRAY_VALUE } from '../../config';
import { IProductFormDataArrays } from './type';

export class StoreFormProductArray {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _formData: IProductFormDataArrays = {
    points: INITIAL_ARRAY_VALUE,
  };

  public get formData() {
    return this._formData;
  }

  public getFormArrays(field: keyof IProductFormDataArrays) {
    return this._formData[field].value;
  }

  public getFormErrors(field: keyof IProductFormDataArrays) {
    return toJS(this._formData[field].errors);
  }

  public addFormArrays(field: keyof IProductFormDataArrays, value: number) {
    this._formData[field].value.push(value);

    this.checkErrorsExist(field);
  }

  public removeFormArrays(field: keyof IProductFormDataArrays, itemId: number) {
    this._formData[field].value = this._formData[field].value.filter(
      (id) => id !== itemId,
    );

    this.checkErrorsExist(field);
  }

  public clearArrays(arrayName?: keyof IProductFormDataArrays) {
    if (arrayName) {
      this._formData[arrayName] = INITIAL_ARRAY_VALUE;
    } else {
      this._formData.points = INITIAL_ARRAY_VALUE;
    }
  }

  private checkErrorsExist(field: keyof IProductFormDataArrays) {
    const validator = new FormArrayValidator(
      this._formData[field].value,
    ).notEmpty();

    if (validator.errors) {
      this._formData[field].errors = validator.errors;
    } else {
      this._formData[field].errors = [];
    }
  }
}
