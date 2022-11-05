import { makeAutoObservable } from 'mobx';

import RootStore from '../../../root';
import { ITaskFormDataArrays, IWarehousePoint } from './type';

export class StoreFormTaskArray {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  private INITIAL_VALUE = {
    value: [],
    errors: ['defaultError'],
  };

  private _formData: ITaskFormDataArrays = {
    products: this.INITIAL_VALUE,
    points: this.INITIAL_VALUE,
    warehousePoints: this.INITIAL_VALUE,
  };

  public get formData() {
    return this._formData;
  }

  public get products() {
    return this._formData.products.value;
  }

  public get points() {
    return this._formData.points.value;
  }

  public get warehousePoints() {
    return this._formData.warehousePoints.value;
  }

  public getFormErrors(field: keyof ITaskFormDataArrays) {
    return this._formData[field].errors;
  }

  public addProduct(productId: number) {
    this._formData.products.value.push(productId);
  }

  public addPoint(pointId: number) {
    this._formData.points.value.push(pointId);
  }

  public addWarehousePoint(warehousePoint: IWarehousePoint) {
    this._formData.warehousePoints.value.push(warehousePoint);
  }

  public removeProduct(productId: number) {
    this._formData.products.value = this._formData.products.value.filter(
      (id) => id !== productId,
    );
  }

  public removePoint(pointId: number) {
    this._formData.points.value = this._formData.points.value.filter(
      (point) => point !== pointId,
    );
  }

  public removeWarehousePoint(floorId: number) {
    this._formData.warehousePoints.value =
      this._formData.warehousePoints.value.filter(
        (warehousePoint) => warehousePoint.floorId !== floorId,
      );
  }

  public clearArrays(arrayName?: keyof ITaskFormDataArrays) {
    if (arrayName) {
      this._formData[arrayName] = this.INITIAL_VALUE;
    } else {
      this._formData.products = this.INITIAL_VALUE;
      this._formData.points = this.INITIAL_VALUE;
      this._formData.warehousePoints = this.INITIAL_VALUE;
    }
  }
}
