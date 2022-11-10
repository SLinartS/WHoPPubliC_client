import { makeAutoObservable, toJS } from 'mobx';

import FormArrayValidator from '../../../../utils/formValidator/formArrayValidator';
import RootStore from '../../../root';
import { INITIAL_ARRAY_VALUE } from '../../utils/config';
import { ITaskFormDataArrays, IWarehousePoint } from './type';

export class StoreFormTaskArray {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
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

  public addFormArrays(
    field: keyof ITaskFormDataArrays,
    value: number | IWarehousePoint,
  ) {
    switch (field) {
      case 'products':
      case 'points':
        this._formData[field].value.push(value as number);
        break;
      case 'warehousePoints':
        this._formData[field].value.push(value as IWarehousePoint);
        break;
      default:
    }
    const validator = new FormArrayValidator(
      this._formData[field].value,
    ).notEmpty();
    this.checkErrorsExist(validator.errors, field);
  }

  public removeFormArrays(field: keyof ITaskFormDataArrays, itemId: number) {
    switch (field) {
      case 'products':
      case 'points':
        this._formData[field].value = this._formData[field].value.filter(
          (id) => id !== itemId,
        );
        break;
      case 'warehousePoints':
        this._formData[field].value = this._formData[field].value.filter(
          (warehousePoint) => warehousePoint.floorId !== itemId,
        );
        break;
      default:
    }
    const validator = new FormArrayValidator(
      this._formData[field].value,
    ).notEmpty();
    this.checkErrorsExist(validator.errors, field);
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

  private checkErrorsExist(
    errors: string[] | false,
    field: keyof ITaskFormDataArrays,
  ) {
    if (errors) {
      this._formData[field].errors = errors;
    } else {
      this._formData[field].errors = [];
    }
  }
}
