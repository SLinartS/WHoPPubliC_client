import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { IPoints } from './type';

export class StorePoint {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  Set the 'active' switch
      at the point to the true,
      which will color it */
  public setPointActive(
    pointType: keyof IPoints,
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
  private _statusFetchPoints: TStatus = 'pending';

  public get statusFetchPoints() {
    return this._statusFetchPoints;
  }

  public set statusFetchPoints(newStatus: TStatus) {
    this._statusFetchPoints = newStatus;
  }

  /*  Array of data
      from the server
      ACCEPTANCE POINTS */
  private _points: IPoints = {
    acceptance: [],
    shipment: [],
  };

  public get points() {
    return this._points;
  }

  public set points(newPoints: IPoints) {
    this._points = newPoints;
  }

  public *fetchPoints() {
    try {
      const response: AxiosResponse<IPoints> = yield extendAxios.get<IPoints>(
        'points',
      );
      this.points = response.data;
      this.statusFetchPoints = 'done';
    } catch (error) {
      this.statusFetchPoints = 'error';
    }
  }
}
