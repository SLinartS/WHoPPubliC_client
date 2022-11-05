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

  public setPointActive(
    pointType: keyof IPoints,
    pointIndex: number,
    newStatus: boolean,
  ) {
    this._points[pointType][pointIndex].active = newStatus;
  }

  private _statusFetchPoints: TStatus = 'pending';

  public get statusFetchPoints() {
    return this._statusFetchPoints;
  }

  public set statusFetchPoints(newStatus: TStatus) {
    this._statusFetchPoints = newStatus;
  }

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
