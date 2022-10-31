import { makeAutoObservable } from 'mobx';
import { IPoint } from '../point/type';

import RootStore from '../root';
import {
  IAddTaskFormDataArrays,
  IAddTaskFormDataFields,
  IWarehousePoint,
  TTaskType,
} from './type';

export class AddTaskFormStore {
  private _rootStore!: RootStore;

  private get rootStore() {
    return this._rootStore;
  }

  private set rootStore(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {});
    this.rootStore = rootStore;
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
  private _formDataField: IAddTaskFormDataFields = {
    title: '',
    dateStart: '',
    dateEnd: '',
    userId: '',
  };

  private _formDataArrays: IAddTaskFormDataArrays = {
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

  // Getters FIELDS
  public get title() {
    return this._formDataField.title;
  }

  public get dateStart() {
    return this._formDataField.dateStart;
  }

  public get dateEnd() {
    return this._formDataField.dateEnd;
  }

  public get userId() {
    return this._formDataField.userId;
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
  public set title(title: string) {
    this._formDataField.title = title;
  }

  public set dateStart(dateStart: string) {
    this._formDataField.dateStart = dateStart;
  }

  public set dateEnd(dateEnd: string) {
    this._formDataField.dateEnd = dateEnd;
  }

  public set userId(userId: string) {
    this._formDataField.userId = userId;
  }

  // ARRAYS
  // Add values
  public addProductId(productId: string) {
    this._formDataArrays.products.push(productId);
  }

  public addPoint(point: IPoint) {
    this._formDataArrays.points.push(point);
  }

  public addWarehousePoint(warehousePoint: IWarehousePoint) {
    this._formDataArrays.warehousePoints.push(warehousePoint);
  }

  // Remove values
  public removeProductId(productId: string) {
    this._formDataArrays.products = this._formDataArrays.products.filter(
      (id) => id !== productId,
    );
  }

  public removePoint(pointId: number) {
    this._formDataArrays.points = this._formDataArrays.points.filter(
      (point) => point.id !== pointId,
    );
  }

  public removeWarehousePoint(floorId: number) {
    this._formDataArrays.warehousePoints =
      this._formDataArrays.warehousePoints.filter(
        (warehousePoint) => warehousePoint.floorId !== floorId,
      );
  }
}
