import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { TPoints } from './type';

export class PointStore {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  Set the 'active' switch 
      at the point to the true, 
      which will color it */
  public setPointActive(
    pointType: keyof TPoints,
    pointIndex: number,
    newStatus: boolean,
  ) {
    this._points[pointType][pointIndex].active = newStatus;
  }

  /*  Is the current open 
      point a pop-up window  */
  private _isSelectedPoint: boolean = false;

  public get isSelectedPoint() {
    return this._isSelectedPoint;
  }

  public set isSelectedPoint(newStatus: boolean) {
    this._isSelectedPoint = newStatus;
  }

  /*  Status of receiving 
      data from the server  
      ACCEPTANCE POINTS   */
  private _status: TStatus = 'pending';

  public get status() {
    return this._status;
  }

  public set status(newStatus: TStatus) {
    this._status = newStatus;
  }

  /*  Array of data 
      from the server 
      ACCEPTANCE POINTS */
  private _points: TPoints = {
    acceptance: [],
    shipment: [],
  };

  public get points() {
    return this._points;
  }

  public set points(newPoints: TPoints) {
    this._points = newPoints;
  }

  public *getPoints() {
    try {
      const response: AxiosResponse<TPoints> = yield extendAxios.get<TPoints>(
        'points',
      );
      this.points = response.data;
      this.status = 'done';
    } catch (error) {
      this.status = 'error';
    }
  }
}
