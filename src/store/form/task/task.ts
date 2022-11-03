import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { TTaskType } from '../../type';
import {
  ITaskFormDataArrays,
  ITaskFormDataFields,
  IWarehousePoint,
} from './type';

export class StoreFormTask {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  The type of task
      being processed  */
  private _currentTaskType: TTaskType = 'acceptance';

  public get currentTaskType() {
    return this._currentTaskType;
  }

  public set currentTaskType(newType: TTaskType) {
    this._currentTaskType = newType;
  }

  /*  Array of data
      from the server */
  private _formDataField: ITaskFormDataFields = {
    article: '',
    dateStart: '',
    dateEnd: '',
  };

  private _formDataArrays: ITaskFormDataArrays = {
    products: [],
    points: [],
    warehousePoints: [],
  };

  // Getters ALL FORM DATA
  public get formDataField() {
    return this._formDataField;
  }

  public get formDataArrays() {
    return this._formDataArrays;
  }

  // Getters ARRAYS
  public get products() {
    return this._formDataArrays.products;
  }

  public get points() {
    return this._formDataArrays.points;
  }

  public get warehousePoints() {
    return this._formDataArrays.warehousePoints;
  }

  // Setters FIELDS
  public set article(article: string) {
    this._formDataField.article = article;
  }

  public set dateStart(dateStart: string) {
    this._formDataField.dateStart = dateStart;
  }

  public set dateEnd(dateEnd: string) {
    this._formDataField.dateEnd = dateEnd;
  }

  // ARRAYS
  // Add values
  public addProduct(productId: number) {
    this._formDataArrays.products.push(productId);
  }

  public addPoint(pointId: number) {
    this._formDataArrays.points.push(pointId);
  }

  public addWarehousePoint(warehousePoint: IWarehousePoint) {
    this._formDataArrays.warehousePoints.push(warehousePoint);
  }

  // Remove values
  public removeProduct(productId: number) {
    this._formDataArrays.products = this._formDataArrays.products.filter(
      (id) => id !== productId,
    );
  }

  public removePoint(pointId: number) {
    this._formDataArrays.points = this._formDataArrays.points.filter(
      (point) => point !== pointId,
    );
  }

  public removeWarehousePoint(floorId: number) {
    this._formDataArrays.warehousePoints =
      this._formDataArrays.warehousePoints.filter(
        (warehousePoint) => warehousePoint.floorId !== floorId,
      );
  }

  // Clear values
  public clearProducts() {
    this._formDataArrays.products = [];
  }

  public clearPoints() {
    this._formDataArrays.points = [];
  }

  public clearWarehousePoints() {
    this._formDataArrays.warehousePoints = [];
  }
}
