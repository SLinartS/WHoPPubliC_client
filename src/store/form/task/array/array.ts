import { makeAutoObservable, toJS } from 'mobx';

import FormArrayValidator from '../../../../utils/formValidator/formArrayValidator';
import RootStore from '../../../root';
import { INITIAL_ARRAY_VALUE } from '../../utils/config';
import { ITaskFormDataArrays } from './type';

export class StoreFormTaskArray {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  private _freeFloorSpace: number = 0;

  public get freeFloorSpace() {
    return this._freeFloorSpace;
  }

  public changeFreeFloorSpace(isAdd: boolean, space: number) {
    if (isAdd) {
      this._freeFloorSpace += space;
    } else {
      this._freeFloorSpace -= space;
    }
  }

  public clearFreeFloorSpace() {
    this._freeFloorSpace = 0;
  }

  private _formData: ITaskFormDataArrays = {
    products: INITIAL_ARRAY_VALUE,
    points: INITIAL_ARRAY_VALUE,
    warehousePoints: INITIAL_ARRAY_VALUE,
  };

  public get formData() {
    return this._formData;
  }

  public getFormArrays(field: keyof ITaskFormDataArrays) {
    return this._formData[field].value;
  }

  public getFormErrors(field: keyof ITaskFormDataArrays) {
    return toJS(this._formData[field].errors);
  }

  public addFormArrays(field: keyof ITaskFormDataArrays, value: number) {
    this._formData[field].value.push(value);

    this.checkErrorsExist(field);
  }

  public removeFormArrays(field: keyof ITaskFormDataArrays, itemId: number) {
    this._formData[field].value = this._formData[field].value.filter(
      (id) => id !== itemId,
    );

    this.checkErrorsExist(field);
  }

  public clearArrays(arrayName?: keyof ITaskFormDataArrays) {
    if (arrayName) {
      this._formData[arrayName] = INITIAL_ARRAY_VALUE;
    } else {
      this._formData.products = INITIAL_ARRAY_VALUE;
      this._formData.points = INITIAL_ARRAY_VALUE;
      this._formData.warehousePoints = INITIAL_ARRAY_VALUE;
    }
  }

  private checkErrorsExist(field: keyof ITaskFormDataArrays) {
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
